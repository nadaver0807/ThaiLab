export enum DishCategory {
  Salads = 'SALADS',
  Starters = 'STARTERS',
  Mains = 'MAINS',
  Sides = 'SIDES',
  Desserts = 'DESSERTS',
}

export const DishCategoryLabel: Record<DishCategory, string> = {
  [DishCategory.Salads]: 'סלטים',
  [DishCategory.Starters]: 'ראשונות',
  [DishCategory.Mains]: 'עיקריות',
  [DishCategory.Sides]: 'תוספות',
  [DishCategory.Desserts]: 'קינוחים',
};

/** סדר הצגת הקטגוריות בתפריט. */
export const DISH_CATEGORY_ORDER: DishCategory[] = [
  DishCategory.Starters,
  DishCategory.Salads,
  DishCategory.Mains,
  DishCategory.Sides,
  DishCategory.Desserts,
];
