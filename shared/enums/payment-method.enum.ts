export enum PaymentMethod {
  OnCollection = 'ON_COLLECTION',
  CreditCard = 'CREDIT_CARD',
}

export const PaymentMethodLabel: Record<PaymentMethod, string> = {
  [PaymentMethod.OnCollection]: 'תשלום במקום',
  [PaymentMethod.CreditCard]: 'כרטיס אשראי',
};
