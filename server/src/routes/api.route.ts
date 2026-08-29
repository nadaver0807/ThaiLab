import { Router } from 'express';
import dishRouter from '../dish/dish.route';
import emailRouter from '../email/email.route';
import authRouter from '../auth/auth.route';
import { API_ROUTES } from './route.const';

const apiRouter = Router();

apiRouter.use(API_ROUTES.Dishes, dishRouter);
apiRouter.use(API_ROUTES.SendEmail, emailRouter);
apiRouter.use(API_ROUTES.Auth, authRouter);

export default apiRouter;
