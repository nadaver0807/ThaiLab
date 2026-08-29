import { Router, type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { authenticateAdmin } from '@/admin-user/adminUser.service';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { loginRateLimiter, resetLoginAttempts } from '@/middlewares/rateLimit.middleware';
import { type MessageResponse } from '@shared/types/api.type';
import { type LoginResponse } from '@shared/types/auth.type';
import { loginSchema, type LoginPayload } from '@shared/validations/auth.validation';

const authRouter = Router();

authRouter.post(
  '/login',
  loginRateLimiter,
  validateZodSchema(loginSchema),
  async (
    req: Request<unknown, LoginResponse | MessageResponse, LoginPayload>,
    res: Response<LoginResponse | MessageResponse>,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;
      const session = await authenticateAdmin(email, password);

      if (!session) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'אימייל או סיסמה שגויים' });

        return;
      }

      resetLoginAttempts(req);
      res.json(session);
    } catch (error) {
      next(error);
    }
  },
);

export default authRouter;
