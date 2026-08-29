'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Dish } from '@shared/types/site.type';
import { type UpdateDishParams } from '@shared/types/dish.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import { USE_GET_DISHES_KEY } from './useGetDishes';

export const updateDish = async ({ uuid, payload }: UpdateDishParams): Promise<Dish> => {
  const { data } = await Api.patch<Dish>(`${API_ROUTES.Dishes}/${uuid}`, payload);

  return data;
};

const useUpdateDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDish,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_DISHES_KEY] }),
  });
};

export default useUpdateDish;
