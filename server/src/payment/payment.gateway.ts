import { type PaymentProvider } from '@shared/enums/payment-provider.enum';
import { type PaymentSession } from '@shared/types/payment.type';
import { type Order } from '@/order/Order.entity';

/** תוצאת אימות תשלום מול הספק. */
export type PaymentVerification = {
  isPaid: boolean;
  /** מזהה העסקה הסופי אצל הספק — נשמר לצורך התאמות והחזרים. */
  transactionId: string | null;
};

/**
 * כל ספק סליקה מיישם את הממשק הזה. שאר המערכת לא יודעת באיזה ספק מדובר,
 * ולכן החלפת ספק היא הוספת קובץ אחד בלבד.
 */
export type PaymentGateway = {
  provider: PaymentProvider;
  /** יוצר דף תשלום ומחזיר את הכתובת שאליה מפנים את הלקוח. */
  createSession(order: Order, successUrl: string, cancelUrl: string): Promise<PaymentSession>;
  /** מאמת מול הספק שהתשלום אכן בוצע — לעולם לא סומכים על הדפדפן. */
  verify(order: Order, payload: Record<string, unknown>): Promise<PaymentVerification>;
};

export class PaymentError extends Error {}
