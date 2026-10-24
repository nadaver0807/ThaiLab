/** ספקי הסליקה הנתמכים — כולם עובדים בדף תשלום מאוחסן (redirect). */
export enum PaymentProvider {
  None = 'NONE',
  CardCom = 'CARDCOM',
  PayPlus = 'PAYPLUS',
  Tranzila = 'TRANZILA',
  Meshulam = 'MESHULAM',
  Make = 'MAKE',
}

export const PaymentProviderLabel: Record<PaymentProvider, string> = {
  [PaymentProvider.None]: 'ללא סליקה',
  [PaymentProvider.CardCom]: 'CardCom',
  [PaymentProvider.PayPlus]: 'PayPlus',
  [PaymentProvider.Tranzila]: 'Tranzila',
  [PaymentProvider.Meshulam]: 'משולם',
  [PaymentProvider.Make]: 'Make',
};
