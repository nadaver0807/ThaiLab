import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { confirmPayment, isCreditCardEnabled, startPayment } from '@/payment/payment.service';
import { PaymentError } from '@/payment/payment.gateway';
import { renderDecisionPage } from '@/order/decisionPage.template';
import { verifyPaymentToken } from '@/util/decisionToken.util';
import { verifyMakeWebhookSecret } from '@/checkout/verifyMakeWebhookSecret.middleware';
import { logger, toSafeError } from '@/util/logger';
import { type MessageResponse } from '@shared/types/api.type';

const paymentRouter = Router();

/** האם להציג ללקוח את אפשרות התשלום באשראי. */
paymentRouter.get('/config', (_request: Request, response: Response) => {
  response.status(StatusCodes.OK).json({ isCreditCardEnabled: isCreditCardEnabled() });
});

/**
 * קישור התשלום מהמייל ללקוח. הטוקן החתום מוכיח שהקישור נשלח על ידינו,
 * ורק אז נוצר דף תשלום אצל הספק והלקוח מופנה אליו.
 */
paymentRouter.get(
  '/:uuid/pay',
  async (
    request: Request<{ uuid: string }, unknown, unknown, { token?: string }>,
    response: Response,
  ) => {
    const { uuid } = request.params;

    if (!verifyPaymentToken(uuid, request.query.token ?? '')) {
      response.status(StatusCodes.FORBIDDEN).send(
        renderDecisionPage({
          title: 'הקישור אינו תקף',
          message: 'ייתכן שהקישור שונה. אפשר לפנות אלינו בטלפון ונשלח קישור חדש.',
          color: '#c62828',
        }),
      );

      return;
    }

    try {
      response.redirect(StatusCodes.SEE_OTHER, await startPayment(uuid));
    } catch (error) {
      if (!(error instanceof PaymentError)) {
        throw error;
      }

      response.status(StatusCodes.BAD_REQUEST).send(
        renderDecisionPage({
          title: 'לא ניתן לשלם כרגע',
          message: error.message,
          color: '#ef6c00',
        }),
      );
    }
  },
);

/**
 * Webhook של ספק הסליקה. זהו המקור היחיד לאמת שההזמנה שולמה —
 * הדפדפן לעולם לא קובע את סטטוס התשלום.
 */
paymentRouter.post(
  '/:uuid/callback',
  verifyMakeWebhookSecret,
  async (request: Request<{ uuid: string }>, response: Response<MessageResponse>) => {
    try {
      const status = await confirmPayment(
        request.params.uuid,
        (request.body ?? {}) as Record<string, unknown>,
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
