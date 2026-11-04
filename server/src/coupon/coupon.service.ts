import { AppDataSource } from '@/config/db/db.config';
import { Coupon } from '@/coupon/Coupon.entity';
import { CouponType } from '@shared/enums/coupon-type.enum';
import { type CouponSummary } from '@shared/types/coupon.type';
import {
  type CreateCouponPayload,
  type UpdateCouponPayload,
} from '@shared/validations/coupon.validation';

const CouponRepository = AppDataSource.getRepository(Coupon);

/** שגיאת ולידציה שההודעה שלה מוצגת ללקוח כמו שהיא. */
export class CouponError extends Error {}

const toSummary = (coupon: Coupon): CouponSummary => ({
  uuid: coupon.uuid,
  code: coupon.code,
  type: coupon.type,
  value: coupon.value,
  minSubtotal: coupon.minSubtotal,
  expiresAt: coupon.expiresAt ? coupon.expiresAt.toISOString() : null,
  maxUses: coupon.maxUses,
  usedCount: coupon.usedCount,
  isActive: coupon.isActive,
  createDate: coupon.createDate.toISOString(),
});

export const normalizeCode = (code: string): string => code.trim().toUpperCase();

/** ההנחה בשקלים — לעולם לא גבוהה מסכום הביניים. */
export const calculateDiscount = (coupon: Coupon, subtotal: number): number => {
  const raw =
    coupon.type === CouponType.Percent ? Math.round((subtotal * coupon.value) / 100) : coupon.value;

  return Math.min(raw, subtotal);
};

const assertUsable = (coupon: Coupon | null, subtotal: number): Coupon => {
  if (!coupon || !coupon.isActive) {
    throw new CouponError('קוד הקופון אינו תקף');
  }

  if (coupon.expiresAt && coupon.expiresAt.getTime() < Date.now()) {
    throw new CouponError('תוקף הקופון פג');
  }

  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    throw new CouponError('הקופון מוצה');
  }

  if (subtotal < coupon.minSubtotal) {
    throw new CouponError(`הקופון תקף להזמנה מ-₪${coupon.minSubtotal}`);
  }

  return coupon;
};

export const findByCode = async (code: string): Promise<Coupon | null> =>
  CouponRepository.findOne({ where: { code: normalizeCode(code) } });

/** בדיקה בלבד — לא צורכת שימוש. משמשת להצגת ההנחה בזמן מילוי הפרטים. */
export const validate = async (
  code: string,
  subtotal: number,
): Promise<{ coupon: Coupon; discount: number }> => {
  const coupon = assertUsable(await findByCode(code), subtotal);

  return { coupon, discount: calculateDiscount(coupon, subtotal) };
};

/**
 * צורכת שימוש בקופון באופן אטומי. ה-UPDATE המותנה מונע מצב שבו שתי הזמנות
 * במקביל עוברות את מגבלת השימושים.
 */
export const consume = async (coupon: Coupon): Promise<void> => {
  const result = await CouponRepository.createQueryBuilder()
    .update(Coupon)
    .set({ usedCount: () => 'used_count + 1' })
    .where('uuid = :uuid', { uuid: coupon.uuid })
    .andWhere('(max_uses IS NULL OR used_count < max_uses)')
    .execute();

  if (!result.affected) {
    throw new CouponError('הקופון מוצה');
  }
};

export const findAll = async (): Promise<CouponSummary[]> => {
  const coupons = await CouponRepository.find({ order: { createDate: 'DESC' } });

  return coupons.map(toSummary);
};

export const create = async (payload: CreateCouponPayload): Promise<CouponSummary> => {
  const existing = await CouponRepository.findOne({
    where: { code: payload.code },
    withDeleted: true,
  });

  if (existing) {
    throw new CouponError('קוד קופון כזה כבר קיים');
  }

  const coupon = CouponRepository.create({
    code: payload.code,
    type: payload.type,
    value: payload.value,
    minSubtotal: payload.minSubtotal,
    expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
    maxUses: payload.maxUses ?? null,
    isActive: payload.isActive,
  });

  return toSummary(await CouponRepository.save(coupon));
};

export const update = async (
  uuid: string,
  payload: UpdateCouponPayload,
): Promise<CouponSummary | null> => {
  const coupon = await CouponRepository.findOne({ where: { uuid } });

  if (!coupon) {
    return null;
  }

  if (payload.code && payload.code !== coupon.code) {
    const clash = await CouponRepository.findOne({
      where: { code: payload.code },
      withDeleted: true,
    });

    if (clash) {
      throw new CouponError('קוד קופון כזה כבר קיים');
    }

    coupon.code = payload.code;
  }

  const nextType = payload.type ?? coupon.type;
  const nextValue = payload.value ?? coupon.value;

  if (nextType === CouponType.Percent && nextValue > 100) {
    throw new CouponError('אחוז ההנחה לא יכול לעלות על 100');
  }

  coupon.type = nextType;
  coupon.value = nextValue;

  if (payload.minSubtotal !== undefined) {
    coupon.minSubtotal = payload.minSubtotal;
  }

  if (payload.expiresAt !== undefined) {
    coupon.expiresAt = payload.expiresAt ? new Date(payload.expiresAt) : null;
  }

  if (payload.maxUses !== undefined) {
    coupon.maxUses = payload.maxUses;
  }

  if (payload.isActive !== undefined) {
    coupon.isActive = payload.isActive;
  }

  return toSummary(await CouponRepository.save(coupon));
};

export const remove = async (uuid: string): Promise<boolean> => {
  const result = await CouponRepository.softDelete({ uuid });

  return Boolean(result.affected);
};
