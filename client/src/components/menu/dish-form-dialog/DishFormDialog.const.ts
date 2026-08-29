import { z } from 'zod';
import { DishCategory, DishCategoryLabel } from '@shared/enums/dish-category.enum';
import { SpiceLevel, SpiceLevelLabel } from '@shared/enums/spice-level.enum';
import { type SelectOption } from '@/components/shared/select/ThailabSelect';
import { type PriceOptions } from '@shared/types/general.type';

export const DEFAULT_PRICE_KEY = 'default';

export const CATEGORY_OPTIONS: SelectOption[] = Object.values(DishCategory).map((value) => ({
  value,
  label: DishCategoryLabel[value],
}));

export const SPICE_OPTIONS: SelectOption[] = Object.values(SpiceLevel).map((value) => ({
  value,
  label: SpiceLevelLabel[value],
}));

export const parsePriceOptions = (raw: string): PriceOptions => {
  const entries = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.lastIndexOf(':');

      if (separatorIndex === -1) {
        return [DEFAULT_PRICE_KEY, Number(line)] as const;
      }

      const label = line.slice(0, separatorIndex).trim() || DEFAULT_PRICE_KEY;

      return [label, Number(line.slice(separatorIndex + 1).trim())] as const;
    });

  return Object.fromEntries(entries);
};

export const formatPriceOptions = (options: PriceOptions): string =>
  Object.entries(options ?? {})
    .map(([label, amount]) => (label === DEFAULT_PRICE_KEY ? `${amount}` : `${label}: ${amount}`))
    .join('\n');

/** סכימת הטופס — המחירים מאומתים אחרי הפירוק מטקסט. */
export const dishFormSchema = z.object({
  name: z.string().trim().min(2, 'שם המנה קצר מדי').max(80, 'שם המנה ארוך מדי'),
  description: z.string().trim().max(600, 'התיאור ארוך מדי'),
  menuCategory: z.nativeEnum(DishCategory),
  spiceLevel: z.nativeEnum(SpiceLevel),
  priceOptionsText: z
    .string()
    .trim()
    .min(1, 'יש להזין לפחות מחיר אחד')
    .refine((raw) => {
      const options = parsePriceOptions(raw);
      const amounts = Object.values(options);

      return (
        amounts.length > 0 && amounts.every((amount) => Number.isInteger(amount) && amount > 0)
      );
    }, 'פורמט המחירים אינו תקין — לדוגמה: "עוף: 70"'),
  notes: z.string().trim().max(300, 'ההערות ארוכות מדי'),
  displayOrder: z.coerce.number().int().min(0, 'סדר תצוגה חייב להיות חיובי'),
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  isGlutenFree: z.boolean(),
  isAvailable: z.boolean(),
});

export type DishFormValues = z.infer<typeof dishFormSchema>;

export const EMPTY_DISH_FORM: DishFormValues = {
  name: '',
  description: '',
  menuCategory: DishCategory.Mains,
  spiceLevel: SpiceLevel.None,
  priceOptionsText: '',
  notes: '',
  displayOrder: 0,
  isVegetarian: false,
  isVegan: false,
  isGlutenFree: false,
  isAvailable: true,
};
