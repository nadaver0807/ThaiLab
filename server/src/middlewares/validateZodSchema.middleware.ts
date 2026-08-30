import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { type ZodSchema } from 'zod';

export const validateZodSchema =
  <T>(schema: ZodSchema<T>, bodyKey: 'body' | 'query' | 'params' = 'body') =>
  (request: Request, response: Response, next: NextFunction): void => {
    const result = schema.safeParse(request[bodyKey]);

    if (!result.success) {
      response.status(StatusCodes.BAD_REQUEST).json({
        message: 'הנתונים שנשלחו אינם תקינים',
        issues: result.error.issues,
      });

      return;
    }

    Object.defineProperty(request, bodyKey, {
      value: result.data,
      writable: true,
      configurable: true,
      enumerable: true,
    });

    next();
  };
