'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type OrderStatus } from '@shared/enums/order-status.enum';
import { type OrderSummary } from '@shared/types/order.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';
import { USE_GET_ORDERS_KEY } from './useGetOrders';

type UpdateOrderStatusParams = {
  uuid: string;
  status: OrderStatus;
};

export const updateOrderStatus = async ({
  uuid,
  status,
}: UpdateOrderStatusParams): Promise<OrderSummary> => {
  const { data } = await Api.patch<OrderSummary>(`${API_ROUTES.Orders}/${uuid}/status`, { status });

  return data;
};

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_ORDERS_KEY] }),
  });
};

export default useUpdateOrderStatus;
