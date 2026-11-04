import { z } from 'zod';
import { CouponType } from '@shared/enums/coupon-type.enum';
import { enumValue, limitedString } from '@shared/validations/common.validation';

const couponBaseSchema = z.object({
  code: limitedString(3, 30)
    .regex(/^[A-Za-z0-9_-]+$/, 'הקוד יכול להכיל אותיות באנגלית, מספרים, - ו-_ בלבד')
    .transform((value) => value.toUpperCase()),
  type: enumValue(CouponType),
  value: z.number().int().positive('הערך חייב להיות גדול מ-0'),
  minSubtotal: z.number().int().min(0).default(0),
  expiresAt: z.string().datetime().nullable().optional(),
  maxUses: z.number().int().positive().nullable().optional(),
  isActive: z.boolean().default(true),
});

const percentWithinRange = (coupon: { type?: CouponType; value?: number }): boolean =>
  coupon.type !== CouponType.Percent || coupon.value === undefined || coupon.value <= 100;

const percentRangeIssue = {
  message: 'אחוז ההנחה לא יכול לעלות על 100',
  path: ['value'],
};

export const createCouponSchema = couponBaseSchema.refine(percentWithinRange, percentRangeIssue);

export const updateCouponSchema = couponBaseSchema
  .partial()
  .refine(percentWithinRange, percentRangeIssue);

export const validateCouponSchema = z.object({
  code: limitedString(1, 30),
  subtotal: z.number().int().min(0),
});

export type CreateCouponPayload = z.infer<typeof createCouponSchema>;

export type UpdateCouponPayload = z.infer<typeof updateCouponSchema>;

export type ValidateCouponPayload = z.infer<typeof validateCouponSchema>;
