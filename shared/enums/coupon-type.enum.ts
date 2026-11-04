/** סוג ההנחה של קוד קופון. */
export enum CouponType {
  Percent = 'PERCENT',
  Fixed = 'FIXED',
}

export const CouponTypeLabel: Record<CouponType, string> = {
  [CouponType.Percent]: 'אחוזים',
  [CouponType.Fixed]: 'סכום קבוע',
};
