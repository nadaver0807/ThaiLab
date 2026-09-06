'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { type StartPaymentResponse } from '@shared/types/payment.type';
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

const useStartPayment = () =>
  useMutation({
    mutationFn: async (orderUuid: string): Promise<StartPaymentResponse> => {
      const { data } = await Api.post<StartPaymentResponse>(
        `${API_ROUTES.Payments}/${orderUuid}/start`,
      );

      return data;
    },
  });

export default useStartPayment;
