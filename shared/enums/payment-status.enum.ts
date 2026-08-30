export enum PaymentStatus {
  Unpaid = 'UNPAID',
  Pending = 'PENDING',
  Paid = 'PAID',
  Failed = 'FAILED',
  Refunded = 'REFUNDED',
}

export const PaymentStatusLabel: Record<PaymentStatus, string> = {
  [PaymentStatus.Unpaid]: 'לא שולם',
  [PaymentStatus.Pending]: 'ממתין לתשלום',
  [PaymentStatus.Paid]: 'שולם',
  [PaymentStatus.Failed]: 'תשלום נכשל',
  [PaymentStatus.Refunded]: 'הוחזר',
};
