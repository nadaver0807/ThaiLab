import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  create,
  CouponError,
  findAll,
  remove,
  update,
  validate,
} from '@/coupon/coupon.service';
import { requireAdmin } from '@/middlewares/auth.middleware';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { type MessageResponse, type UuidParams } from '@shared/types/api.type';
import {
  type CouponSummary,
  type GetCouponsResponse,
  type ValidateCouponResponse,
} from '@shared/types/coupon.type';
import {
  createCouponSchema,
  updateCouponSchema,
  validateCouponSchema,
  type CreateCouponPayload,
  type UpdateCouponPayload,
  type ValidateCouponPayload,
} from '@shared/validations/coupon.validation';

const couponRouter = Router();

/** בדיקת קופון בצ'קאאוט — ציבורי, לא צורך שימוש. */
couponRouter.post(
  '/validate',
  validateZodSchema(validateCouponSchema),
  async (
    request: Request<unknown, ValidateCouponResponse | MessageResponse, ValidateCouponPayload>,
    response: Response<ValidateCouponResponse | MessageResponse>,
  ) => {
    try {
      const { coupon, discount } = await validate(request.body.code, request.body.subtotal);

      response.status(StatusCodes.OK).json({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
      });
    } catch (error) {
      if (error instanceof CouponError) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

        return;
      }

      throw error;
    }
  },
);

couponRouter.get(
  '/',
  requireAdmin,
  async (_request: Request, response: Response<GetCouponsResponse>) => {
    response.status(StatusCodes.OK).json({ coupons: await findAll() });
  },
);

couponRouter.post(
  '/',
  requireAdmin,
  validateZodSchema(createCouponSchema),
  async (
    request: Request<unknown, CouponSummary | MessageResponse, CreateCouponPayload>,
    response: Response<CouponSummary | MessageResponse>,
  ) => {
    try {
      response.status(StatusCodes.CREATED).json(await create(request.body));
    } catch (error) {
      if (error instanceof CouponError) {
        response.status(StatusCodes.CONFLICT).json({ message: error.message });

        return;
      }

      throw error;
    }
  },
);

couponRouter.patch(
  '/:uuid',
  requireAdmin,
  validateZodSchema(updateCouponSchema),
  async (
    request: Request<UuidParams, CouponSummary | MessageResponse, UpdateCouponPayload>,
    response: Response<CouponSummary | MessageResponse>,
  ) => {
    try {
      const coupon = await update(request.params.uuid, request.body);

      if (!coupon) {
        response.status(StatusCodes.NOT_FOUND).json({ message: 'הקופון לא נמצא' });

        return;
      }

      response.status(StatusCodes.OK).json(coupon);
    } catch (error) {
      if (error instanceof CouponError) {
        response.status(StatusCodes.CONFLICT).json({ message: error.message });

        return;
      }

      throw error;
    }
  },
);

couponRouter.delete(
  '/:uuid',
  requireAdmin,
  async (request: Request<UuidParams>, response: Response<MessageResponse>) => {
    const isRemoved = await remove(request.params.uuid);

    if (!isRemoved) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'הקופון לא נמצא' });

      return;
    }

    response.status(StatusCodes.OK).json({ message: 'הקופון נמחק' });
  },
);

export default couponRouter;
