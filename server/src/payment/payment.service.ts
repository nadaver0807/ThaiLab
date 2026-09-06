import { CLIENT_ORIGIN, PAYMENT_PROVIDER } from '@/server.const';
import { AppDataSource } from '@/config/db/db.config';
import { Order } from '@/order/Order.entity';
import { cardComGateway } from '@/payment/cardcom.gateway';
import { payPlusGateway } from '@/payment/payplus.gateway';
import { PaymentError, type PaymentGateway } from '@/payment/payment.gateway';
import { logger, toSafeError } from '@/util/logger';
import { PaymentProvider } from '@shared/enums/payment-provider.enum';
import { PaymentMethod } from '@shared/enums/payment-method.enum';
import { PaymentStatus } from '@shared/enums/payment-status.enum';
import { Route } from '@shared/enums/route.enum';

const GATEWAYS: Partial<Record<string, PaymentGateway>> = {
  [PaymentProvider.CardCom]: cardComGateway,
  [PaymentProvider.PayPlus]: payPlusGateway,
};

const OrderRepository = AppDataSource.getRepository(Order);

/** הספק שהוגדר ב-env, או null כשהאתר עובד בתשלום במקום בלבד. */
export const getGateway = (): PaymentGateway | null => GATEWAYS[PAYMENT_PROVIDER] ?? null;

export const isCreditCardEnabled = (): boolean => getGateway() !== null;

const buildReturnUrl = (orderUuid: string, isSuccess: boolean): string => {
  const base = CLIENT_ORIGIN.replace(/\/$/, '');

  return `${base}${Route.Checkout}/${orderUuid}?payment=${isSuccess ? 'success' : 'failed'}`;
};

/**
 * יוצר דף תשלום אצל הספק ומחזיר את הכתובת שאליה מפנים את הלקוח.
 * פרטי האשראי לעולם לא עוברים דרך השרת שלנו — הלקוח מקליד אותם אצל הספק.
 */
export const startPayment = async (orderUuid: string): Promise<string> => {
  const gateway = getGateway();

  if (!gateway) {
    throw new PaymentError('סליקת אשראי אינה מוגדרת');
  }

  const order = await OrderRepository.findOne({
    where: { uuid: orderUuid },
    relations: { items: true },
  });

  if (!order) {
    throw new PaymentError('ההזמנה לא נמצאה');
  }

  if (order.paymentStatus === PaymentStatus.Paid) {
    throw new PaymentError('ההזמנה כבר שולמה');
  }

  const session = await gateway.createSession(
    order,
    buildReturnUrl(orderUuid, true),
    buildReturnUrl(orderUuid, false),
  );

  order.paymentMethod = PaymentMethod.CreditCard;
  order.paymentStatus = PaymentStatus.Pending;
  order.paymentProvider = gateway.provider;
  order.paymentReference = session.providerReference || null;

  await OrderRepository.save(order);

  return session.paymentUrl;
};

/**
 * מאמת מול הספק שהתשלום בוצע ומעדכן את ההזמנה.
 * נקרא מה-webhook של הספק — לא מהדפדפן, כדי שלא ניתן יהיה לזייף "שולם".
 */
export const confirmPayment = async (
  orderUuid: string,
  payload: Record<string, unknown>,
): Promise<PaymentStatus> => {
  const gateway = getGateway();

  if (!gateway) {
    throw new PaymentError('סליקת אשראי אינה מוגדרת');
  }

  const order = await OrderRepository.findOne({
    where: { uuid: orderUuid },
    relations: { items: true },
  });

  if (!order) {
    throw new PaymentError('ההזמנה לא נמצאה');
  }

  if (order.paymentStatus === PaymentStatus.Paid) {
    return PaymentStatus.Paid;
  }

  try {
    const { isPaid, transactionId } = await gateway.verify(order, payload);

    order.paymentStatus = isPaid ? PaymentStatus.Paid : PaymentStatus.Failed;
    order.paymentReference = transactionId ?? order.paymentReference;

    await OrderRepository.save(order);

    return order.paymentStatus;
  } catch (error) {
    logger.error({ err: toSafeError(error), orderUuid }, 'payment verification failed');

    throw new PaymentError('אימות התשלום נכשל');
  }
};
