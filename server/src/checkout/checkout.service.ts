import axios, { AxiosError } from 'axios';

import { AppDataSource } from '@/config/db/db.config';
import { Order } from '@/order/Order.entity';
import { OrderItem } from '@/order-item/OrderItem.entity';
import { upsertByPhone } from '@/costumer/costumer.service';
import { logger, toSafeError } from '@/util/logger';
import {
  CLIENT_ORIGIN,
  MAKE_PAYMENT_WEBHOOK_TIMEOUT_MS,
  MAKE_PAYMENT_WEBHOOK_URL,
} from '@/server.const';
import { OrderStatus } from '@shared/enums/order-status.enum';
import { OrderType } from '@shared/enums/order-type.enum';
import { PaymentMethod } from '@shared/enums/payment-method.enum';
import { PaymentProvider } from '@shared/enums/payment-provider.enum';
import { PaymentStatus } from '@shared/enums/payment-status.enum';
import { Route } from '@shared/enums/route.enum';
import { type CreatePaymentLinkPayload } from '@shared/validations/checkout.validation';
import { type PaymentWebhookPayload } from '@shared/types/checkout.type';

const OrderRepository = AppDataSource.getRepository(Order);

export class CheckoutError extends Error {
  constructor(
    message: string,
    public readonly isRetryable = false,
  ) {
    super(message);
  }
}

const buildReturnUrl = (orderUuid: string, isSuccess: boolean): string => {
  const base = CLIENT_ORIGIN.replace(/\/$/, '');

  return `${base}${Route.Checkout}/${orderUuid}?payment=${isSuccess ? 'success' : 'failed'}`;
};

/**
 * יוצר (או מעדכן, אם ה-`orderId` כבר קיים) את ההזמנה במצב "ממתין לתשלום".
 * ה-`orderId` שמגיע מהלקוח הוא ה-`uuid` של הזמנה שכבר נוצרה ב-`/orders` —
 * כאן רק מסמנים שהתחיל תהליך תשלום ושומרים מי המזמין.
 */
const persistPendingOrder = async (payload: CreatePaymentLinkPayload): Promise<Order> => {
  const existing = await OrderRepository.findOne({
    where: { uuid: payload.orderId },
    relations: { items: true },
  });

  const costumer = await upsertByPhone({
    firstName: payload.customer.name,
    lastName: '',
    phone: payload.customer.phone,
    email: payload.customer.email,
  });

  if (existing) {
    existing.paymentStatus = PaymentStatus.Pending;
    existing.paymentMethod = PaymentMethod.CreditCard;
    existing.paymentProvider = PaymentProvider.Make;
    existing.totalPrice = payload.amount;
    existing.contactEmail = payload.customer.email;
    existing.contactPhone = payload.customer.phone;
    existing.contactName = payload.customer.name;

    return OrderRepository.save(existing);
  }

  const items = payload.items.map((item) =>
    OrderItem.create({
      dishName: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      priceKey: 'default',
      selectedNotes: [],
    }),
  );

  const order = OrderRepository.create({
    uuid: payload.orderId,
    costumer,
    items,
    status: OrderStatus.Pending,
    type: OrderType.Pickup,
    paymentMethod: PaymentMethod.CreditCard,
    paymentStatus: PaymentStatus.Pending,
    paymentProvider: PaymentProvider.Make,
    subtotal: payload.amount,
    deliveryFee: 0,
    totalPrice: payload.amount,
    address: null,
    contactName: payload.customer.name,
    contactPhone: payload.customer.phone,
    contactEmail: payload.customer.email,
    notes: payload.notes || null,
  });

  return OrderRepository.save(order);
};

type MakeWebhookResponse = {
  paymentUrl?: unknown;
};

/**
 * שולח את פרטי ההזמנה לתרחיש ה-Make ומחזיר את קישור התשלום שהתרחיש בנה
 * (בד״כ מול Grow). Make הוא תיווך בלבד — אנחנו לעולם לא פונים לספק הסליקה ישירות.
 */
const requestPaymentUrlFromMake = async (
  order: Order,
  payload: CreatePaymentLinkPayload,
): Promise<string> => {
  if (!MAKE_PAYMENT_WEBHOOK_URL) {
    throw new CheckoutError('Make הוא בלתי מוגדר (MAKE_PAYMENT_WEBHOOK_URL חסר)');
  }

  try {
    const { data } = await axios.post<MakeWebhookResponse>(
      MAKE_PAYMENT_WEBHOOK_URL,
      {
        orderId: order.uuid,
        amount: payload.amount,
        customer: payload.customer,
        items: payload.items,
        redirectUrl: buildReturnUrl(order.uuid, true),
        successUrl: buildReturnUrl(order.uuid, true),
        cancelUrl: buildReturnUrl(order.uuid, false),
      },
      { timeout: MAKE_PAYMENT_WEBHOOK_TIMEOUT_MS },
    );

    if (typeof data.paymentUrl !== 'string' || !data.paymentUrl) {
      throw new CheckoutError('תגובת Make אינה מכילה paymentUrl תקין');
    }

    return data.paymentUrl;
  } catch (error) {
    const isTimeout = error instanceof AxiosError && error.code === 'ECONNABORTED';

    logger.error(
      { err: toSafeError(error), orderUuid: order.uuid, isTimeout },
      'Make payment webhook failed',
    );

    throw new CheckoutError(
      isTimeout ? 'הפנייה ל-Make נכשלה עקב פסק זמן' : 'הפנייה ל-Make נכשלה',
      true,
    );
  }
};

/**
 * מסמן שניסיון יצירת קישור התשלום נכשל, כדי שאפשר יהיה לזהות הזמנות תקועות
 * ולנסות שוב — בלי לגעת ב-`status` הכללי של ההזמנה.
 */
const markPaymentAttemptFailed = async (orderUuid: string): Promise<void> => {
  await OrderRepository.update({ uuid: orderUuid }, { paymentStatus: PaymentStatus.Failed });
};

/**
 * הזרימה המלאה של יצירת קישור תשלום: שומרים את ההזמנה כ"ממתינה לתשלום",
 * פונים ל-Make כדי שיבנה את דף הסליקה, ומחזירים את הכתובת ללקוח.
 */
export const createPaymentLink = async (payload: CreatePaymentLinkPayload): Promise<string> => {
  const order = await persistPendingOrder(payload);

  try {
    return await requestPaymentUrlFromMake(order, payload);
  } catch (error) {
    await markPaymentAttemptFailed(order.uuid);

    throw error;
  }
};

/**
 * מעבד את קריאת ה-webhook שחוזרת מ-Make/Grow לאחר שהלקוח סיים לשלם (או שהתשלום נכשל).
 * זהו המקור היחיד לאמת שההזמנה שולמה — לעולם לא סומכים על redirect בדפדפן.
 * אידמפוטנטי: קריאה חוזרת על אותה הזמנה ששולמה כבר לא עושה דבר.
 */
export const applyPaymentWebhook = async (payload: PaymentWebhookPayload): Promise<void> => {
  const order = await OrderRepository.findOne({ where: { uuid: payload.orderId } });

  if (!order) {
    throw new CheckoutError(`הזמנה ${payload.orderId} לא נמצאה`);
  }

  if (order.paymentStatus === PaymentStatus.Paid) {
    return;
  }

  order.paymentStatus = payload.status === 'PAID' ? PaymentStatus.Paid : PaymentStatus.Failed;
  order.paymentReference = payload.transactionId ?? order.paymentReference;

  if (payload.status === 'PAID') {
    order.status = OrderStatus.Confirmed;
  }

  await OrderRepository.save(order);
};
