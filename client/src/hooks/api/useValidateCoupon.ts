'use client';

import { useMutation } from '@tanstack/react-query';
import { type ValidateCouponResponse } from '@shared/types/coupon.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const validateCoupon = async (
  code: string,
  subtotal: number,
): Promise<ValidateCouponResponse> => {
  const { data } = await Api.post<ValidateCouponResponse>(`${API_ROUTES.Coupons}/validate`, {
    code,
    subtotal,
  });

  return data;
};

const useValidateCoupon = () =>
  useMutation({
    mutationFn: ({ code, subtotal }: { code: string; subtotal: number }) =>
      validateCoupon(code, subtotal),
  });

export default useValidateCoupon;
