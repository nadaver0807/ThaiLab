import { z } from 'zod';
import { DishCategory } from '@shared/enums/dish-category.enum';
import { SpiceLevel } from '@shared/enums/spice-level.enum';
import { limitedString } from '@shared/validations/common.validation';

const priceOptions = () =>
  z
    .record(z.string().min(1), z.coerce.number().int().positive())
    .refine((options) => Object.keys(options).length > 0, {
      message: 'יש להגדיר לפחות אפשרות מחיר אחת',
    });

export const createDishSchema = z.object({
  name: limitedString(2, 80),
  description: limitedString(0, 600).default(''),
  menuCategory: z.nativeEnum(DishCategory),
  priceOptions: priceOptions(),
  spiceLevel: z.nativeEnum(SpiceLevel).default(SpiceLevel.None),
  isVegetarian: z.boolean().default(false),
  isVegan: z.boolean().default(false),
  isGlutenFree: z.boolean().default(false),
  imageUrl: z.string().url().nullable().optional(),
  notes: limitedString(0, 300).nullable().optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isAvailable: z.boolean().default(true),
});

export const updateDishSchema = createDishSchema
  .partial()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: 'יש לשלוח לפחות שדה אחד לעדכון',
  });

export type CreateDishPayload = z.infer<typeof createDishSchema>;
export type UpdateDishPayload = z.infer<typeof updateDishSchema>;
