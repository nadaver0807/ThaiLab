import { randomUUID } from "crypto";

import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { addColors, createLogger, format, transports } from "winston";

dotenv.config();

const isDevelopment = process.env.NODE_ENV === "development";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      id?: string;
    }
  }
}

type SafeErrorShape = {
  type: string;
  message: string;
  stack?: string;
  code?: string;
  statusCode?: number;
  method?: string;
  url?: string;
  responseError?: string;
  responseMessage?: string;
};

export const toSafeError = (err: unknown): SafeErrorShape => {
  if (!(err instanceof Error)) {
    return {
      message: String(err),
      type: "UnknownError",
    };
  }

  const errorAsAxios = err as Error & {
    code?: string;
    status?: number;
    config?: {
      method?: string;
      url?: string;
    };
    response?: {
      status?: number;
      data?:
        | {
            error?: string;
            message?: string;
            details?: string;
            error_description?: string;
          }
        | string;
    };
  };

  return {
    code: errorAsAxios.code,
    message: err.message,
    method: errorAsAxios.config?.method?.toUpperCase(),
    responseError:
      typeof errorAsAxios.response?.data === "object" &&
      errorAsAxios.response?.data
        ? errorAsAxios.response.data.error
        : undefined,
    responseMessage:
      typeof errorAsAxios.response?.data === "object" &&
      errorAsAxios.response?.data
        ? errorAsAxios.response.data.message ||
          errorAsAxios.response.data.error_description
        : typeof errorAsAxios.response?.data === "string"
          ? errorAsAxios.response.data
          : undefined,
    stack: err.stack,
    statusCode: errorAsAxios.response?.status ?? errorAsAxios.status,
    type: err.name,
    url: errorAsAxios.config?.url,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRoute = (req: any) => {
  if (req.route?.path) {
    const baseUrl = req.baseUrl || "";

    return `${baseUrl}${req.route.path}`;
  }

  return req.originalUrl || req.url;
};

const getOutcome = (statusCode: number) => {
  return statusCode >= 400 ? "error" : "success";
};

const LOG_LEVELS = {
  debug: 4,
  error: 1,
  fatal: 0,
  info: 3,
  trace: 5,
  warn: 2,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

addColors({
  debug: "blue",
  error: "red",
  fatal: "red",
  info: "green",
  trace: "gray",
  warn: "yellow",
});

const LEVEL_SYMBOL = Symbol.for("level");

const reshapeForJson = format((info) => {
  const { level, message, ...rest } = info as Record<string, unknown> & {
    level: string;
    message: unknown;
  };

  const reshaped: Record<string, unknown> = {
    "@timestamp": new Date().toISOString(),
    "log.level": level,
    message,
    ...rest,
  };

  // Preserve winston's internal level symbol so transports can still filter by level.
  (reshaped as Record<symbol, unknown>)[LEVEL_SYMBOL] = (
    info as Record<symbol, unknown>
  )[LEVEL_SYMBOL];

  return reshaped as typeof info;
});

const devFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  format.colorize({ level: true }),
  format.printf(({ level, message, timestamp, ...meta }) => {
    const metaEntries = Object.entries(meta).filter(
      ([key]) => key !== "service.name" && key !== "environment",
    );
    const metaString = metaEntries.length
      ? ` ${JSON.stringify(Object.fromEntries(metaEntries))}`
      : "";

    return `[${timestamp}] ${level}: ${message}${metaString}`;
  }),
);

const winstonLogger = createLogger({
  defaultMeta: {
    environment: process.env.NODE_ENV,
    "service.name": "nifgaim-core",
  },
  format: isDevelopment
    ? devFormat
    : format.combine(reshapeForJson(), format.json()),
  level: isDevelopment ? "debug" : "info",
  levels: LOG_LEVELS,
  transports: [new transports.Console()],
});

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  !(value instanceof Error);

const collectMeta = (values: unknown[]): Record<string, unknown> =>
  values
    .filter(isPlainObject)
    .reduce<Record<string, unknown>>(
      (acc, current) => ({ ...acc, ...current }),
      {},
    );

// Adapter that accepts both pino-style calls -- logger.error(objOrErr, 'message') --
// and winston-style calls -- logger.info('message', { meta }).
const createLogFn =
  (level: LogLevel) =>
  (objOrMsg: unknown, msgOrMeta?: unknown, ...rest: unknown[]) => {
    if (typeof objOrMsg === "string") {
      const meta = collectMeta([msgOrMeta, ...rest]);
      winstonLogger.log({ ...meta, level, message: objOrMsg });

      return;
    }

    const mergingObject =
      objOrMsg instanceof Error
        ? { err: toSafeError(objOrMsg) }
        : (objOrMsg ?? {});
    const message = typeof msgOrMeta === "string" ? msgOrMeta : "";
    winstonLogger.log({
      ...(mergingObject as Record<string, unknown>),
      level,
      message,
    });
  };

export const logger = {
  debug: createLogFn("debug"),
  error: createLogFn("error"),
  fatal: createLogFn("fatal"),
  info: createLogFn("info"),
  trace: createLogFn("trace"),
  warn: createLogFn("warn"),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCommonProps = (req: any, res: any, responseTime?: number) => ({
  appid: req.user?.appid,
  body: req.body,
  "http.request.method": req.method,
  "http.response.status_code": res.statusCode,
  outcome: getOutcome(res.statusCode),
  reqId: req.id,
  responseTimeMs: responseTime,
  route: getRoute(req),
  "url.path": req.originalUrl || req.url,
  userId: req.user?.id ?? req.user?.teudatZehut,
});

const NANOSECONDS_PER_MILLISECOND = 1e6;

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const url = req.url ?? "";

  if (url === "/" || url.includes("/health")) {
    next();

    return;
  }

  if (!req.id) {
    const headerId = req.headers["x-request-id"];
    req.id = (Array.isArray(headerId) ? headerId[0] : headerId) ?? randomUUID();
  }

  const startNs = process.hrtime.bigint();

  const onFinish = () => {
    res.removeListener("finish", onFinish);
    res.removeListener("close", onFinish);

    const responseTime =
      Number(process.hrtime.bigint() - startNs) / NANOSECONDS_PER_MILLISECOND;
    const commonProps = getCommonProps(req, res, responseTime);

    if (res.statusCode >= 400) {
      const err =
        (res as Response & { err?: unknown }).err ??
        (res.locals as { err?: unknown })?.err;

      if (err) {
        const safeError = toSafeError(err);
        logger.error(
          {
            ...commonProps,
            errorCode: safeError.code,
            errorMessage: safeError.message,
            errorMethod: safeError.method,
            errorResponseError: safeError.responseError,
            errorResponseMessage: safeError.responseMessage,
            errorStack: safeError.stack,
            errorStatusCode: safeError.statusCode,
            errorType: safeError.type,
            errorUrl: safeError.url,
          },
          `${req.method} ${getRoute(req)} failed with ${res.statusCode}: ${safeError.message}`,
        );

        return;
      }

      logger.error(
        commonProps,
        `${req.method} ${getRoute(req)} failed with ${res.statusCode}`,
      );

      return;
    }

    logger.info(
      commonProps,
      `${req.method} ${getRoute(req)} completed with ${res.statusCode}`,
    );
  };

  res.on("finish", onFinish);
  res.on("close", onFinish);

  next();
};

export default loggerMiddleware;
