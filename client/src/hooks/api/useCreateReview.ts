'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type MessageResponse } from '@shared/types/api.type';
import { type CreateReviewPayload } from '@shared/validations/review.validation';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import { USE_GET_REVIEWS_KEY } from './useGetReviews';

export const createReview = async (payload: CreateReviewPayload): Promise<MessageResponse> => {
  const { data } = await Api.post<MessageResponse>(API_ROUTES.Reviews, payload);

  return data;
};

const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_REVIEWS_KEY] }),
  });
};

export default useCreateReview;
