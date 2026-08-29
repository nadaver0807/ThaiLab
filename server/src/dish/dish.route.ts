import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { type Dish } from '@/dish/Dish.entity';
import { create, findAll, findByCategory, findByUuid, remove, update } from '@/dish/dish.service';
import { attachUser, requireAdmin } from '@/middlewares/auth.middleware';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { type UuidParams, type MessageResponse } from '@shared/types/api.type';
import { type GetDishesParams, type GetDishesResponse } from '@shared/types/dish.type';
import {
  createDishSchema,
  updateDishSchema,
  type CreateDishPayload,
  type UpdateDishPayload,
} from '@shared/validations/dish.validation';

const dishRouter = Router();

dishRouter.get(
  '/',
  attachUser,
  async (
    request: Request<unknown, GetDishesResponse, unknown, GetDishesParams>,
    response: Response<GetDishesResponse>,
  ) => {
    const { category } = request.query;
    const dishes = category ? await findByCategory(category) : await findAll();

    response.status(StatusCodes.OK).json({
      dishes,
      isAdmin: Boolean(request.isAdmin),
    });
  },
);

dishRouter.get(
  '/:id',
  async (request: Request<UuidParams>, response: Response<Dish | MessageResponse>) => {
    const dish = await findByUuid(request.params.uuid);

    if (!dish) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'המנה לא נמצאה' });

      return;
    }

    response.status(StatusCodes.OK).json(dish);
  },
);

dishRouter.post(
  '/',
  requireAdmin,
  validateZodSchema(createDishSchema),
  async (request: Request<unknown, Dish, CreateDishPayload>, response: Response<Dish>) => {
    const dish = await create(request.body);

    response.status(StatusCodes.CREATED).json(dish);
  },
);

dishRouter.patch(
  '/:id',
  requireAdmin,
  validateZodSchema(updateDishSchema),
  async (
    request: Request<UuidParams, Dish | MessageResponse, UpdateDishPayload>,
    response: Response<Dish | MessageResponse>,
  ) => {
    const dish = await update(request.params.uuid, request.body);

    if (!dish) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'המנה לא נמצאה' });

      return;
    }

    response.status(StatusCodes.OK).json(dish);
  },
);

dishRouter.delete(
  '/:id',
  requireAdmin,
  async (request: Request<UuidParams>, response: Response<MessageResponse>) => {
    const isDeleted = await remove(request.params.uuid);

    if (!isDeleted) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'המנה לא נמצאה' });

      return;
    }

    response.status(StatusCodes.OK).json({ message: 'המנה נמחקה' });
  },
);

export default dishRouter;
