'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type MessageResponse } from '@shared/types/api.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import { USE_GET_DISHES_KEY } from './useGetDishes';

export const deleteDish = async (uuid: string): Promise<MessageResponse> => {
  const { data } = await Api.delete<MessageResponse>(`${API_ROUTES.Dishes}/${uuid}`);

  return data;
};

const useDeleteDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDish,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_DISHES_KEY] }),
  });
};

export default useDeleteDish;
