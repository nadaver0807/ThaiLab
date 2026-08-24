export enum DishCategory {
  Starters = 'STARTERS',
  Soups = 'SOUPS',
  Noodles = 'NOODLES',
  Curries = 'CURRIES',
  Desserts = 'DESSERTS',
  Drinks = 'DRINKS',
}

export const DishCategoryLabel: Record<DishCategory, string> = {
  [DishCategory.Starters]: 'מנות ראשונות',
  [DishCategory.Soups]: 'מרקים',
  [DishCategory.Noodles]: 'אטריות',
  [DishCategory.Curries]: 'קארי',
  [DishCategory.Desserts]: 'קינוחים',
  [DishCategory.Drinks]: 'משקאות',
};
