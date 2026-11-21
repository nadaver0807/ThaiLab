'use client';

import { useQuery } from '@tanstack/react-query';
import Api from './api.util';
import { API_ROUTES } from './api.const';

type PaymentConfig = { isCreditCardEnabled: boolean };

export const useGetPaymentConfig = () =>
  useQuery({
    queryKey: ['payment-config'],
    queryFn: async (): Promise<PaymentConfig> => {
      const { data } = await Api.get<PaymentConfig>(`${API_ROUTES.Payments}/config`);

      return data;
    },
    staleTime: Infinity,
  });
