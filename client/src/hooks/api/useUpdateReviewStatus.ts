'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Review, type UpdateReviewStatusParams } from '@shared/types/review.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import { USE_GET_REVIEWS_KEY } from './useGetReviews';

export const updateReviewStatus = async ({
  uuid,
  status,
}: UpdateReviewStatusParams): Promise<Review> => {
  const { data } = await Api.patch<Review>(`${API_ROUTES.Reviews}/${uuid}/status`, { status });

  return data;
};

const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReviewStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_REVIEWS_KEY] }),
  });
};

export default useUpdateReviewStatus;
