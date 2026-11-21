import axios, { AxiosError } from 'axios';

import { MAKE_PAYMENT_WEBHOOK_TIMEOUT_MS, MAKE_PAYMENT_WEBHOOK_URL } from '@/server.const';
import { PaymentProvider } from '@shared/enums/payment-provider.enum';
import { type PaymentSession } from '@shared/types/payment.type';
import { type Order } from '@/order/Order.entity';
import { logger, toSafeError } from '@/util/logger';
import {
  buildCallbackUrl,
  PaymentError,
  type PaymentGateway,
  type PaymentVerification,
} from '@/payment/payment.gateway';

type MakeWebhookResponse = {
  paymentUrl?: unknown;
};

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]']);

/** Grow מקבל רק כתובות https ציבוריות לחזרה ול-callback. */
const isPublicUrl = (value: string): boolean => {
  try {
    const { protocol, hostname } = new URL(value);

    return protocol === 'https:' && !LOCAL_HOSTS.has(hostname);
  } catch {
    return false;
  }
};

/**
 * Make.com הוא תיווך בלבד — התרחיש שם בונה את קישור התשלום מול Grow
 * ומחזיר אותו ב-`paymentUrl`. אנחנו לא פונים ל-Grow ישירות.
 *
 * כשהתשלום מסתיים, התרחיש שולח POST אל `callbackUrl`
 * (`/api/payments/:uuid/callback`) עם `{ status: 'PAID' | 'FAILED', transactionId }`
 * וה-header `x-make-webhook-secret`.
 */
export const makeGateway: PaymentGateway = {
  provider: PaymentProvider.Make,

  async createSession(
    order: Order,
    successUrl: string,
    cancelUrl: string,
  ): Promise<PaymentSession> {
    if (!MAKE_PAYMENT_WEBHOOK_URL) {
      throw new PaymentError('Make אינו מוגדר (MAKE_PAYMENT_WEBHOOK_URL חסר)');
    }

    const callbackUrl = buildCallbackUrl(order.uuid);

    // Grow דוחה כתובות מקומיות (שגיאה 427) — עוצרים כאן במקום לייצר שגיאות בתרחיש ב-Make
    if (![successUrl, cancelUrl, callbackUrl].every(isPublicUrl)) {
      throw new PaymentError(
        'תשלום באשראי דורש כתובות ציבוריות (https). בסביבה מקומית יש להגדיר CLIENT_ORIGIN ו-SERVER_PUBLIC_URL לכתובת מנהרה (למשל ngrok).',
      );
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
          callbackUrl,
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
   * Make מדווח על התשלום בגוף ה-webhook. אין קריאה יוצאת לאימות, ולכן הנתיב
   * מוגן בסוד משותף (ראו `verifyMakeWebhookSecret.middleware`).
   */
  async verify(_order: Order, payload: Record<string, unknown>): Promise<PaymentVerification> {
    const status = String(payload.status ?? '').toUpperCase();
    const transactionId = payload.transactionId ? String(payload.transactionId) : null;

    return { isPaid: status === 'PAID', transactionId };
  },
};
