import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { requireAdmin } from '@/middlewares/auth.middleware';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { getOpeningHours, saveOpeningHours } from '@/opening-hours/openingHours.service';
import { type GetOpeningHoursResponse } from '@shared/types/opening-hours.type';
import {
  updateOpeningHoursSchema,
  type UpdateOpeningHoursPayload,
} from '@shared/validations/opening-hours.validation';

const openingHoursRouter = Router();

/** ציבורי — הלקוח צריך את השעות כדי להציג חלונות זמינים בצ'קאאוט. */
openingHoursRouter.get(
  '/',
  async (_request: Request, response: Response<GetOpeningHoursResponse>) => {
    response.status(StatusCodes.OK).json({ days: await getOpeningHours() });
  },
);

openingHoursRouter.put(
  '/',
  requireAdmin,
  validateZodSchema(updateOpeningHoursSchema),
  async (
    request: Request<unknown, GetOpeningHoursResponse, UpdateOpeningHoursPayload>,
    response: Response<GetOpeningHoursResponse>,
  ) => {
    response.status(StatusCodes.OK).json({ days: await saveOpeningHours(request.body.days) });
  },
);

export default openingHoursRouter;
