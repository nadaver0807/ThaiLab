import { Router } from 'express';
import dishRouter from '../dish/dish.route';
import emailRouter from '../email/email.route';
import authRouter from '../auth/auth.route';
import orderRouter from '../order/order.route';
import costumerRouter from '../costumer/costumer.route';
import reviewRouter from '../review/review.route';
import paymentRouter from '../payment/payment.route';
import { API_ROUTES } from './route.const';

const apiRouter = Router();

apiRouter.use(API_ROUTES.Dishes, dishRouter);
apiRouter.use(API_ROUTES.SendEmail, emailRouter);
apiRouter.use(API_ROUTES.Auth, authRouter);
apiRouter.use(API_ROUTES.Orders, orderRouter);
apiRouter.use(API_ROUTES.Customers, costumerRouter);
apiRouter.use(API_ROUTES.Reviews, reviewRouter);
apiRouter.use(API_ROUTES.Payments, paymentRouter);

export default apiRouter;
