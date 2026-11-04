export enum PaymentMethod {
  OnCollection = 'ON_COLLECTION',
  CreditCard = 'CREDIT_CARD',
}

export const PaymentMethodLabel: Record<PaymentMethod, string> = {
  [PaymentMethod.OnCollection]: 'מזומן',
  [PaymentMethod.CreditCard]: 'כרטיס אשראי',
};
