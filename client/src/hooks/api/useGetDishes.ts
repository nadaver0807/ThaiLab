'use client';

import { useQuery } from '@tanstack/react-query';
import { type Dish, type DishCategory } from '@thailab/shared';
import { request } from './api.util';

export const USE_GET_DISHES_KEY = 'useGetDishes';

type GetDishesParams = {
  category?: DishCategory;
};

export const getDishes = async ({ category }: GetDishesParams): Promise<Dish[]> => {
  const query = category ? `?category=${category}` : '';

  return request<Dish[]>(`/dishes${query}`);
};

const useGetDishes = (params: GetDishesParams = {}) =>
  useQuery({
    queryKey: [USE_GET_DISHES_KEY, params],
    queryFn: () => getDishes(params),
  });

export default useGetDishes;
