import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { verifyMakeWebhookSecret } from '@/checkout/verifyMakeWebhookSecret.middleware';
import { confirmPayment } from '@/payment/payment.service';
import { logger, toSafeError } from '@/util/logger';

const checkoutRouter = Router();

/**
 * הנתיב הישן שתרחיש ה-Make שולח אליו את עדכון התשלום:
 * `POST /api/checkout/payment-webhook` עם `{ orderId, status, transactionId }`.
 * נשמר כדי שהתרחיש הקיים ימשיך לעבוד — מעביר לאותה לוגיקה כמו `/payments/:uuid/callback`.
 * תמיד מחזיר 200 כדי ש-Make לא ינסה שוב ושוב.
 */
checkoutRouter.post(
  '/payment-webhook',
  verifyMakeWebhookSecret,
  async (request: Request<unknown, unknown, Record<string, unknown>>, response: Response) => {
    const orderId = String(request.body?.orderId ?? '');

    try {
      if (!orderId) {
        throw new Error('orderId missing');
      }

      const status = await confirmPayment(orderId, request.body);

      response.status(StatusCodes.OK).json({ message: status });
    } catch (error) {
      logger.error({ err: toSafeError(error), orderUuid: orderId }, 'payment-webhook failed');

      response.status(StatusCodes.OK).json({ message: 'received' });
    }
  },
);

export default checkoutRouter;
