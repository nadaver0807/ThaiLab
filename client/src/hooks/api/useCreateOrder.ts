'use client';

import { useMutation } from '@tanstack/react-query';
import { type OrderSummary } from '@shared/types/order.type';
import { type CreateOrderPayload } from '@shared/validations/order.validation';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const createOrder = async (payload: CreateOrderPayload): Promise<OrderSummary> => {
  const { data } = await Api.post<OrderSummary>(API_ROUTES.Orders, payload);

  return data;
};

const useCreateOrder = () => useMutation({ mutationFn: createOrder });

export default useCreateOrder;
