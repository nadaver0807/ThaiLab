import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import {
  applyDecision,
  create,
  findAll,
  findByUuid,
  OrderValidationError,
  updateStatus,
} from '@/order/order.service';
import { renderDecisionPage } from '@/order/decisionPage.template';
import { OrderDecision, verifyDecisionToken } from '@/util/decisionToken.util';
import { requireAdmin } from '@/middlewares/auth.middleware';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { OrderStatus, OrderStatusLabel } from '@shared/enums/order-status.enum';
import { type MessageResponse, type UuidParams } from '@shared/types/api.type';
import { type GetOrdersResponse, type OrderSummary } from '@shared/types/order.type';
import { enumValue } from '@shared/validations/common.validation';
import { createOrderSchema, type CreateOrderPayload } from '@shared/validations/order.validation';

const updateStatusSchema = z.object({ status: enumValue(OrderStatus) });

type UpdateStatusPayload = z.infer<typeof updateStatusSchema>;

const orderRouter = Router();

orderRouter.post(
  '/',
  validateZodSchema(createOrderSchema),
  async (
    request: Request<unknown, OrderSummary | MessageResponse, CreateOrderPayload>,
    response: Response<OrderSummary | MessageResponse>,
  ) => {
    try {
      const order = await create(request.body);

      response.status(StatusCodes.CREATED).json(order);
    } catch (error) {
      if (error instanceof OrderValidationError) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

        return;
      }

      throw error;
    }
  },
);

orderRouter.get(
  '/',
  requireAdmin,
  async (_request: Request, response: Response<GetOrdersResponse>) => {
    response.status(StatusCodes.OK).json({ orders: await findAll() });
  },
);

orderRouter.get(
  '/:uuid/decision/:decision',
  async (
    request: Request<{ uuid: string; decision: string }, unknown, unknown, { token?: string }>,
    response: Response,
  ) => {
    const { uuid, decision } = request.params;
    const token = request.query.token ?? '';

    const isKnownDecision = Object.values(OrderDecision).includes(decision as OrderDecision);

    if (!isKnownDecision || !verifyDecisionToken(uuid, decision as OrderDecision, token)) {
      response.status(StatusCodes.FORBIDDEN).send(
        renderDecisionPage({
          title: 'הקישור אינו תקף',
          message: 'ייתכן שהקישור פג או שונה. פתחו את ההזמנה ממסך הניהול.',
          color: '#c62828',
        }),
      );

      return;
    }

    const isConfirmed = decision === OrderDecision.Confirm;
    const result = await applyDecision(uuid, isConfirmed);

    if (!result) {
      response.status(StatusCodes.NOT_FOUND).send(
        renderDecisionPage({
          title: 'ההזמנה לא נמצאה',
          message: 'ייתכן שההזמנה נמחקה.',
          color: '#c62828',
        }),
      );

      return;
    }

    if (result.wasAlreadyHandled) {
      response.status(StatusCodes.OK).send(
        renderDecisionPage({
          title: 'ההזמנה כבר טופלה',
          message: `סטטוס ההזמנה כעת: ${OrderStatusLabel[result.order.status]}. לא נשלחה הודעה נוספת ללקוח.`,
          color: '#ef6c00',
        }),
      );

      return;
    }

    response.status(StatusCodes.OK).send(
      renderDecisionPage({
        title: isConfirmed ? 'ההזמנה אושרה' : 'ההזמנה נדחתה',
        message: `נשלחה הודעה ל${result.order.contactName} בכתובת ${result.order.contactEmail}.`,
        color: isConfirmed ? '#2e7d32' : '#c62828',
      }),
    );
  },
);

orderRouter.get(
  '/:uuid',
  requireAdmin,
  async (request: Request<UuidParams>, response: Response<OrderSummary | MessageResponse>) => {
    const order = await findByUuid(request.params.uuid);

    if (!order) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'ההזמנה לא נמצאה' });

      return;
    }

    response.status(StatusCodes.OK).json(order);
  },
);

orderRouter.patch(
  '/:uuid/status',
  requireAdmin,
  validateZodSchema(updateStatusSchema),
  async (
    request: Request<UuidParams, OrderSummary | MessageResponse, UpdateStatusPayload>,
    response: Response<OrderSummary | MessageResponse>,
  ) => {
    const order = await updateStatus(request.params.uuid, request.body.status);

    if (!order) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'ההזמנה לא נמצאה' });

      return;
    }

    response.status(StatusCodes.OK).json(order);
  },
);

export default orderRouter;
