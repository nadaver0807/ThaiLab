/** תגובת `POST /api/checkout/create-payment-link` בהצלחה. */
export type CreatePaymentLinkResponse = {
  success: true;
  paymentUrl: string;
};

export type PaymentWebhookPayload = {
  orderId: string;
  status: 'PAID' | 'FAILED';
  transactionId?: string;
};
