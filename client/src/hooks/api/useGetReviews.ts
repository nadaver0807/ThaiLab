'use client';

import { useQuery } from '@tanstack/react-query';
import { type GetReviewsResponse } from '@shared/types/review.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import useAuth from '@/hooks/auth/useAuth';

export const USE_GET_REVIEWS_KEY = 'useGetReviews';

export const getReviews = async (): Promise<GetReviewsResponse> => {
  const { data } = await Api.get<GetReviewsResponse>(API_ROUTES.Reviews);

  return data;
};

const useGetReviews = () => {
  const { userEmail } = useAuth();

  return useQuery({
    queryKey: [USE_GET_REVIEWS_KEY, userEmail],
    queryFn: getReviews,
  });
};

export default useGetReviews;
