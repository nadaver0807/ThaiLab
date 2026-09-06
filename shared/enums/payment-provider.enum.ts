/** ספקי הסליקה הנתמכים — כולם עובדים בדף תשלום מאוחסן (redirect). */
export enum PaymentProvider {
  /** ללא סליקה — תשלום במקום. */
  None = 'NONE',
  CardCom = 'CARDCOM',
  PayPlus = 'PAYPLUS',
  Tranzila = 'TRANZILA',
  Meshulam = 'MESHULAM',
}

export const PaymentProviderLabel: Record<PaymentProvider, string> = {
  [PaymentProvider.None]: 'ללא סליקה',
  [PaymentProvider.CardCom]: 'CardCom',
  [PaymentProvider.PayPlus]: 'PayPlus',
  [PaymentProvider.Tranzila]: 'Tranzila',
  [PaymentProvider.Meshulam]: 'משולם',
};
