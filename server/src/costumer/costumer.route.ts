import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findByPhone } from '@/costumer/costumer.service';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { type CustomerLookupResponse } from '@shared/types/order.type';
import {
  customerLookupSchema,
  type CustomerLookupPayload,
} from '@shared/validations/order.validation';

const costumerRouter = Router();

costumerRouter.get(
  '/lookup',
  validateZodSchema(customerLookupSchema, 'query'),
  async (
    request: Request<unknown, CustomerLookupResponse, unknown, CustomerLookupPayload>,
    response: Response<CustomerLookupResponse>,
  ) => {
    const costumer = await findByPhone(request.query.phone);

    if (!costumer) {
      response.status(StatusCodes.OK).json({ isReturning: false });

      return;
    }

    response.status(StatusCodes.OK).json({
      isReturning: true,
      customer: {
        firstName: costumer.firstName,
        lastName: costumer.lastName,
        email: costumer.email,
        address: costumer.address,
      },
    });
  },
);

export default costumerRouter;
