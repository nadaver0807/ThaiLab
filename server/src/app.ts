import cors from "cors";
import express, { type Express } from "express";
import dishRouter from "./dish/dish.route";
import session from "express-session";

import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/errorHandler.middleware";
import { CLIENT_ORIGIN } from "./server.const";
import qs from "qs";
import { CorsConfig } from "./config/cors/cors.config";
import loggerMiddleware from "./util/logger";

export const createApp = async (app: Express) => {
  app.set("query parser", (str: string) => {
    return qs.parse(str, { arrayLimit: 100 });
  });

  const { AZURE_CLIENT_SECRET } = process.env;
  app.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: CLIENT_ORIGIN?.startsWith("https"),
      },
      resave: false,
      saveUninitialized: true,
      secret: AZURE_CLIENT_SECRET || "",
    }),
  );

  app.use(cors(CorsConfig));

  app.use(express.json({ limit: "5mb" }));
  app.use(loggerMiddleware);

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/dishes", dishRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
