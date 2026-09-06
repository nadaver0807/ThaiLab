import { PAYMENT_API_KEY, PAYMENT_API_SECRET, PAYMENT_TERMINAL_ID } from '@/server.const';
import { PaymentProvider } from '@shared/enums/payment-provider.enum';
import { type PaymentSession } from '@shared/types/payment.type';
import { type Order } from '@/order/Order.entity';
import {
  PaymentError,
  type PaymentGateway,
  type PaymentVerification,
} from '@/payment/payment.gateway';

const API_BASE = 'https://secure.cardcom.solutions/api/v11';

type CreateLowProfileResponse = {
  ResponseCode: number;
  Description?: string;
  Url?: string;
  LowProfileId?: string;
};

type LowProfileResultResponse = {
  ResponseCode: number;
  Description?: string;
  TranzactionInfo?: { TranzactionId?: number; ResponseCode?: number };
};

const postJson = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new PaymentError(`CardCom החזיר שגיאה (${response.status})`);
  }

  return (await response.json()) as T;
};

/**
 * CardCom Low Profile — הלקוח מועבר לדף תשלום מאובטח של CardCom,
 * ולכן פרטי האשראי לעולם לא עוברים דרך השרת שלנו.
 */
export const cardComGateway: PaymentGateway = {
  provider: PaymentProvider.CardCom,

  async createSession(
    order: Order,
    successUrl: string,
    cancelUrl: string,
  ): Promise<PaymentSession> {
    const result = await postJson<CreateLowProfileResponse>('/LowProfile/Create', {
      TerminalNumber: Number(PAYMENT_TERMINAL_ID),
      ApiName: PAYMENT_API_KEY,
      Operation: 'ChargeOnly',
      // CardCom עובד בשקלים שלמים עם אגורות — הסכומים אצלנו בשקלים שלמים
      Amount: order.totalPrice,
      ISOCoinId: 1,
      SuccessRedirectUrl: successUrl,
      FailedRedirectUrl: cancelUrl,
      ReturnValue: order.uuid,
      Document: {
        Name: order.contactName,
        Email: order.contactEmail,
        Phone: order.contactPhone,
        Products: order.items.map((item) => ({
          Description: item.variantLabel
            ? `${item.dishName} — ${item.variantLabel}`
            : item.dishName,
          UnitCost: item.unitPrice,
          Quantity: item.quantity,
        })),
      },
    });

    if (result.ResponseCode !== 0 || !result.Url) {
      throw new PaymentError(result.Description ?? 'יצירת דף התשלום נכשלה');
    }

    return { paymentUrl: result.Url, providerReference: result.LowProfileId ?? '' };
  },

  async verify(_order: Order, payload: Record<string, unknown>): Promise<PaymentVerification> {
    const lowProfileId = String(payload.lowProfileId ?? '');

    if (!lowProfileId) {
      return { isPaid: false, transactionId: null };
    }

    const result = await postJson<LowProfileResultResponse>('/LowProfile/GetLpResult', {
      TerminalNumber: Number(PAYMENT_TERMINAL_ID),
      ApiName: PAYMENT_API_KEY,
      ApiPassword: PAYMENT_API_SECRET,
      LowProfileId: lowProfileId,
    });

    const isPaid = result.ResponseCode === 0 && result.TranzactionInfo?.ResponseCode === 0;
    const transactionId = result.TranzactionInfo?.TranzactionId;

    return { isPaid, transactionId: transactionId ? String(transactionId) : null };
  },
};
