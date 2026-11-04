'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type MessageResponse } from '@shared/types/api.type';
import { type CouponSummary, type GetCouponsResponse } from '@shared/types/coupon.type';
import {
  type CreateCouponPayload,
  type UpdateCouponPayload,
} from '@shared/validations/coupon.validation';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const USE_GET_COUPONS_KEY = 'useGetCoupons';

export const useGetCoupons = (isEnabled: boolean) =>
  useQuery({
    queryKey: [USE_GET_COUPONS_KEY],
    queryFn: async () => (await Api.get<GetCouponsResponse>(API_ROUTES.Coupons)).data,
    enabled: isEnabled,
  });

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCouponPayload) =>
      (await Api.post<CouponSummary>(API_ROUTES.Coupons, payload)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_COUPONS_KEY] }),
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, payload }: { uuid: string; payload: UpdateCouponPayload }) =>
      (await Api.patch<CouponSummary>(`${API_ROUTES.Coupons}/${uuid}`, payload)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_COUPONS_KEY] }),
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) =>
      (await Api.delete<MessageResponse>(`${API_ROUTES.Coupons}/${uuid}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_COUPONS_KEY] }),
  });
};
