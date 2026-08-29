import { type DishCategory } from '@shared/enums/dish-category.enum';
import { type Dish } from '@shared/types/site.type';
import { type UpdateDishPayload } from '@shared/validations/dish.validation';

export type GetDishesParams = {
  category?: DishCategory;
};

export type GetDishesResponse = {
  dishes: Dish[];
  isAdmin: boolean;
};

export type UpdateDishParams = {
  uuid: string;
  payload: UpdateDishPayload;
};
