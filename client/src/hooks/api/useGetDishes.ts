'use client';

import { useQuery } from '@tanstack/react-query';
import { type Dish } from '@shared/types/site.type';
import Api from './api.util';
import { type DishCategory } from '@shared/enums/dish-category.enum';

export const USE_GET_DISHES_KEY = 'useGetDishes';

type GetDishesParams = {
  category?: DishCategory;
};

export const getDishes = async ({ category }: GetDishesParams): Promise<Dish[]> => {
  const { data } = await Api.get<Dish[]>('/dishes', {
    params: category ? { category } : undefined,
  });

  return data;
};

const useGetDishes = (params: GetDishesParams = {}) =>
  useQuery({
    queryKey: [USE_GET_DISHES_KEY, params],
    queryFn: () => getDishes(params),
  });

export default useGetDishes;
