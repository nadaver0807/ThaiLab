import { DEFAULT_PRICE_KEY } from '@shared/consts/order.const';
import { type PriceOptions } from '@shared/types/general.type';

export type VariantOption = {
  /** מפתח המחיר — "עוף", "טופו", "שרימפס". */
  priceKey: string;
  price: number;
};

/**
 * כל אפשרות מחיר היא מוצר נפרד בתפריט — גם כשהמחיר זהה.
 * "פאד תאי" עם {עוף: 65, טופו: 65, שרימפס: 75} מוצג כשלוש שורות נפרדות,
 * כדי שהלקוח ידייק בדיוק מה הזמין ושניהול ההזמנות יהיה חד־משמעי.
 *
 * מנה בלי וריאציות מחזירה שורה אחת עם priceKey = "default".
 */
export const getVariantRows = (priceOptions: PriceOptions): VariantOption[] =>
  Object.entries(priceOptions ?? {}).map(([priceKey, price]) => ({ priceKey, price }));

/** התווית שנשמרת בהזמנה — null רק למנה בלי וריאציות. */
export const resolveVariantLabel = (priceKey: string): string | null =>
  priceKey && priceKey !== DEFAULT_PRICE_KEY ? priceKey : null;
