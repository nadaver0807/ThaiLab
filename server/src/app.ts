import cors from 'cors';
import express, { type Express } from 'express';

import { errorHandler, notFoundHandler } from './middlewares/errorHandler.middleware';
import apiRouter from './routes/api.route';
import { API_PREFIX, HEALTH_ROUTE } from './routes/route.const';
import qs from 'qs';
import { CorsConfig } from './config/cors/cors.config';
import loggerMiddleware from './util/logger';

export const createApp = async (app: Express) => {
  app.set('query parser', (str: string) => {
    return qs.parse(str, { arrayLimit: 100 });
  });

  app.use(cors(CorsConfig));

  app.use(express.json({ limit: '5mb' }));
  app.use(loggerMiddleware);

  app.get(HEALTH_ROUTE, (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.use(API_PREFIX, apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
