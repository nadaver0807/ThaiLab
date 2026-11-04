import { type CouponType } from '@shared/enums/coupon-type.enum';

/** קופון כפי שהוא מוצג לעופר בפאנל הניהול. */
export type CouponSummary = {
  uuid: string;
  code: string;
  type: CouponType;
  /** אחוזים (1–100) או סכום בשקלים, לפי `type`. */
  value: number;
  /** סכום ביניים מינימלי להזמנה כדי שהקופון יתקבל. */
  minSubtotal: number;
  expiresAt: string | null;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  createDate: string;
};

export type GetCouponsResponse = {
  coupons: CouponSummary[];
};

/** תוצאת בדיקת קופון בזמן מילוי הפרטים בצ'קאאוט. */
export type ValidateCouponResponse = {
  code: string;
  type: CouponType;
  value: number;
  /** סכום ההנחה בשקלים עבור סכום הביניים שנשלח. */
  discount: number;
};
