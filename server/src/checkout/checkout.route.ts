import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { applyPaymentWebhook, CheckoutError, createPaymentLink } from '@/checkout/checkout.service';
import { verifyMakeWebhookSecret } from '@/checkout/verifyMakeWebhookSecret.middleware';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { logger, toSafeError } from '@/util/logger';
import { type MessageResponse } from '@shared/types/api.type';
import { type CreatePaymentLinkResponse, type PaymentWebhookPayload } from '@shared/types/checkout.type';
import {
  createPaymentLinkSchema,
  type CreatePaymentLinkPayload,
} from '@shared/validations/checkout.validation';

const checkoutRouter = Router();

checkoutRouter.post(
  '/create-payment-link',
  validateZodSchema(createPaymentLinkSchema),
  async (
    request: Request<unknown, unknown, CreatePaymentLinkPayload>,
    response: Response<CreatePaymentLinkResponse | MessageResponse>,
  ) => {
    try {
      const paymentUrl = await createPaymentLink(request.body);

      response.status(StatusCodes.OK).json({ success: true, paymentUrl });
    } catch (error) {
      logger.error(
        { err: toSafeError(error), orderId: request.body.orderId },
        'create-payment-link failed',
      );

      const message =
        error instanceof CheckoutError ? error.message : 'יצירת קישור התשלום נכשלה';

      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  },
);

/**
 * Webhook שמקבל את עדכון התשלום מ-Make (לאחר שה-Grow מצד שני סיים לסלוק).
 * תמיד מחזיר 200 כדי ש-Make לא ינסה שוב ושוב על שגיאת ולידציה חד-פעמית.
 */
checkoutRouter.post(
  '/payment-webhook',
  verifyMakeWebhookSecret,
  async (request: Request<unknown, unknown, PaymentWebhookPayload>, response: Response) => {
    try {
      await applyPaymentWebhook(request.body);

      response.status(StatusCodes.OK).json({ message: 'ok' });
    } catch (error) {
      logger.error(
        { err: toSafeError(error), orderId: request.body?.orderId },
        'payment-webhook failed',
      );

      response.status(StatusCodes.OK).json({ message: 'received' });
    }
  },
);

export default checkoutRouter;
