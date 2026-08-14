import cors from 'cors';
import express, { type Express } from 'express';
import contactRouter from './contact/contact.route';
import dishRouter from './dish/dish.route';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.middleware';
import { CLIENT_ORIGIN } from './server.const';

export const createApp = (): Express => {
  const app = express();

  app.use(cors({ origin: CLIENT_ORIGIN }));
  app.use(express.json());

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.use('/api/dishes', dishRouter);
  app.use('/api/contact', contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
