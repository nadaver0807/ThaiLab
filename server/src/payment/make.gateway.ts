import axios, { AxiosError } from 'axios';

import { MAKE_PAYMENT_WEBHOOK_TIMEOUT_MS, MAKE_PAYMENT_WEBHOOK_URL } from '@/server.const';
import { PaymentProvider } from '@shared/enums/payment-provider.enum';
import { type PaymentSession } from '@shared/types/payment.type';
import { type Order } from '@/order/Order.entity';
import { logger, toSafeError } from '@/util/logger';
import { PaymentError, type PaymentGateway, type PaymentVerification } from '@/payment/payment.gateway';

type MakeWebhookResponse = {
  paymentUrl?: unknown;
};

/**
 * Make.com הוא תיווך בלבד — התרחיש שם בונה את קישור התשלום (מול Grow)
 * ומחזיר אותו ב-`paymentUrl`. אנחנו לעולם לא פונים ל-Grow ישירות.
 * אימות התשלום בפועל מגיע כ-webhook נכנס אל `/api/payments/:uuid/callback`
 * (ראו `confirmPayment` / `verify` למטה) — ולא דרך קריאה יוצאת נוספת.
 */
export const makeGateway: PaymentGateway = {
  provider: PaymentProvider.Make,

  async createSession(
    order: Order,
    successUrl: string,
    cancelUrl: string,
  ): Promise<PaymentSession> {
    if (!MAKE_PAYMENT_WEBHOOK_URL) {
      throw new PaymentError('Make הוא בלתי מוגדר (MAKE_PAYMENT_WEBHOOK_URL חסר)');
    }

    try {
      const { data } = await axios.post<MakeWebhookResponse>(
        MAKE_PAYMENT_WEBHOOK_URL,
        {
          orderId: order.uuid,
          amount: order.totalPrice,
          customer: {
            name: order.contactName,
            email: order.contactEmail,
            phone: order.contactPhone,
          },
          items: order.items.map((item) => ({
            name: item.variantLabel ? `${item.dishName} — ${item.variantLabel}` : item.dishName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          redirectUrl: successUrl,
          successUrl,
          cancelUrl,
        },
        { timeout: MAKE_PAYMENT_WEBHOOK_TIMEOUT_MS },
      );

      if (typeof data.paymentUrl !== 'string' || !data.paymentUrl) {
        throw new PaymentError('תגובת Make אינה מכילה paymentUrl תקין');
      }

      return { paymentUrl: data.paymentUrl, providerReference: order.uuid };
    } catch (error) {
      if (error instanceof PaymentError) {
        throw error;
      }

      const isTimeout = error instanceof AxiosError && error.code === 'ECONNABORTED';

      logger.error(
        { err: toSafeError(error), orderUuid: order.uuid, isTimeout },
        'Make payment webhook failed',
      );

      throw new PaymentError(isTimeout ? 'הפנייה ל-Make נכשלה עקב פסק זמן' : 'הפנייה ל-Make נכשלה');
    }
  },

  /**
   * Make/Grow מדווחים על תשלום שהושלם ב-POST ל-`/api/payments/:uuid/callback`.
   * אין קריאה יוצאת לאימות — מסתמכים על הגוף שנשלח ב-webhook (ולכן חשוב
   * להגן על הנתיב הזה בסוד משותף, ראו `verifyMakeWebhookSecret.middleware`).
   */
  async verify(_order: Order, payload: Record<string, unknown>): Promise<PaymentVerification> {
    const status = String(payload.status ?? '').toUpperCase();
    const transactionId = payload.transactionId ? String(payload.transactionId) : null;

    return { isPaid: status === 'PAID', transactionId };
  },
};
