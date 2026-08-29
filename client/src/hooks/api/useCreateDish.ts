'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Dish } from '@shared/types/site.type';
import { type CreateDishPayload } from '@shared/validations/dish.validation';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import { USE_GET_DISHES_KEY } from './useGetDishes';

export const createDish = async (payload: CreateDishPayload): Promise<Dish> => {
  const { data } = await Api.post<Dish>(API_ROUTES.Dishes, payload);

  return data;
};

const useCreateDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDish,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_DISHES_KEY] }),
  });
};

export default useCreateDish;
