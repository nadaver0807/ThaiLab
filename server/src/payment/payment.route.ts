import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { confirmPayment, isCreditCardEnabled, startPayment } from '@/payment/payment.service';
import { PaymentError } from '@/payment/payment.gateway';
import { logger, toSafeError } from '@/util/logger';
import { type MessageResponse } from '@shared/types/api.type';
import { type StartPaymentResponse } from '@shared/types/payment.type';

const paymentRouter = Router();

/** האם להציג ללקוח את אפשרות התשלום באשראי. */
paymentRouter.get('/config', (_request: Request, response: Response) => {
  response.status(StatusCodes.OK).json({ isCreditCardEnabled: isCreditCardEnabled() });
});

/** יוצר דף תשלום ומחזיר את הכתובת שאליה יש להפנות את הלקוח. */
paymentRouter.post(
  '/:uuid/start',
  async (
    request: Request<{ uuid: string }>,
    response: Response<StartPaymentResponse | MessageResponse>,
  ) => {
    try {
      const paymentUrl = await startPayment(request.params.uuid);

      response.status(StatusCodes.OK).json({ orderUuid: request.params.uuid, paymentUrl });
    } catch (error) {
      if (error instanceof PaymentError) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

        return;
      }

      throw error;
    }
  },
);

/**
 * Webhook של ספק הסליקה. זהו המקור היחיד לאמת שההזמנה שולמה —
 * הדפדפן לעולם לא קובע את סטטוס התשלום.
 */
paymentRouter.post(
  '/:uuid/callback',
  async (request: Request<{ uuid: string }>, response: Response<MessageResponse>) => {
    try {
      const status = await confirmPayment(
        request.params.uuid,
        request.body as Record<string, unknown>,
      );

      response.status(StatusCodes.OK).json({ message: status });
    } catch (error) {
      logger.error(
        { err: toSafeError(error), orderUuid: request.params.uuid },
        'payment callback failed',
      );

      // מחזירים 200 כדי שהספק לא ינסה שוב ושוב על בקשה פגומה
      response.status(StatusCodes.OK).json({ message: 'received' });
    }
  },
);

export default paymentRouter;
