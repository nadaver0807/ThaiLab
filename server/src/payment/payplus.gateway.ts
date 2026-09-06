import {
  PAYMENT_API_KEY,
  PAYMENT_API_SECRET,
  PAYMENT_TERMINAL_ID,
  PAYMENT_TEST_MODE,
} from '@/server.const';
import { PaymentProvider } from '@shared/enums/payment-provider.enum';
import { type PaymentSession } from '@shared/types/payment.type';
import { type Order } from '@/order/Order.entity';
import {
  PaymentError,
  type PaymentGateway,
  type PaymentVerification,
} from '@/payment/payment.gateway';

const API_BASE = PAYMENT_TEST_MODE
  ? 'https://restapidev.payplus.co.il/api/v1.0'
  : 'https://restapi.payplus.co.il/api/v1.0';

type GeneratePageResponse = {
  results?: { status?: string; description?: string };
  data?: { payment_page_link?: string; page_request_uid?: string };
};

type CheckStatusResponse = {
  results?: { status?: string };
  data?: { status?: string; transaction?: { uid?: string; status_code?: string } };
};

const postJson = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify({
        api_key: PAYMENT_API_KEY,
        secret_key: PAYMENT_API_SECRET,
      }),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new PaymentError(`PayPlus החזיר שגיאה (${response.status})`);
  }

  return (await response.json()) as T;
};

/** PayPlus — דף תשלום מאוחסן, פרטי האשראי לא עוברים דרך השרת שלנו. */
export const payPlusGateway: PaymentGateway = {
  provider: PaymentProvider.PayPlus,

  async createSession(
    order: Order,
    successUrl: string,
    cancelUrl: string,
  ): Promise<PaymentSession> {
    const result = await postJson<GeneratePageResponse>('/PaymentPages/generateLink', {
      payment_page_uid: PAYMENT_TERMINAL_ID,
      charge_method: 1,
      amount: order.totalPrice,
      currency_code: 'ILS',
      sendEmailApproval: false,
      refURL_success: successUrl,
      refURL_failure: cancelUrl,
      refURL_cancel: cancelUrl,
      more_info: order.uuid,
      customer: {
        customer_name: order.contactName,
        email: order.contactEmail,
        phone: order.contactPhone,
      },
      items: order.items.map((item) => ({
        name: item.variantLabel ? `${item.dishName} — ${item.variantLabel}` : item.dishName,
        quantity: item.quantity,
        price: item.unitPrice,
      })),
    });

    const paymentUrl = result.data?.payment_page_link;

    if (!paymentUrl) {
      throw new PaymentError(result.results?.description ?? 'יצירת דף התשלום נכשלה');
    }

    return { paymentUrl, providerReference: result.data?.page_request_uid ?? '' };
  },

  async verify(_order: Order, payload: Record<string, unknown>): Promise<PaymentVerification> {
    const pageRequestUid = String(payload.pageRequestUid ?? '');

    if (!pageRequestUid) {
      return { isPaid: false, transactionId: null };
    }

    const result = await postJson<CheckStatusResponse>('/PaymentPages/ipn', {
      page_request_uid: pageRequestUid,
    });

    const isPaid = result.data?.status === 'approved';

    return { isPaid, transactionId: result.data?.transaction?.uid ?? null };
  },
};
