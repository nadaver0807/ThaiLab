import { type PaymentProvider } from '@shared/enums/payment-provider.enum';
import { type PaymentStatus } from '@shared/enums/payment-status.enum';

/** תוצאת יצירת דף תשלום אצל ספק הסליקה. */
export type PaymentSession = {
  /** הכתובת שאליה מפנים את הלקוח כדי לשלם. */
  paymentUrl: string;
  /** מזהה העסקה/הבקשה אצל הספק — לצורך אימות מאוחר יותר. */
  providerReference: string;
};

export type StartPaymentResponse = {
  orderUuid: string;
  paymentUrl: string;
};

export type PaymentStatusResponse = {
  orderUuid: string;
  paymentStatus: PaymentStatus;
  provider: PaymentProvider;
};
