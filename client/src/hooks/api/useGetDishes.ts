'use client';

import { useQuery } from '@tanstack/react-query';
import { type GetDishesParams, type GetDishesResponse } from '@shared/types/dish.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import useAuth from '@/hooks/auth/useAuth';

export const USE_GET_DISHES_KEY = 'useGetDishes';

export const getDishes = async ({ category }: GetDishesParams): Promise<GetDishesResponse> => {
  const { data } = await Api.get<GetDishesResponse>(API_ROUTES.Dishes, {
    params: category ? { category } : undefined,
  });

  return data;
};

const useGetDishes = (params: GetDishesParams = {}) => {
  const { userEmail } = useAuth();

  return useQuery({
    queryKey: [USE_GET_DISHES_KEY, params, userEmail],
    queryFn: () => getDishes(params),
  });
};

export default useGetDishes;
