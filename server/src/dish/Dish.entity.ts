import { type DishCategory, type SpiceLevel } from '@thailab/shared';

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  spiceLevel: SpiceLevel;
  imageUrl?: string;
  isVegan: boolean;
  isGlutenFree: boolean;
};
