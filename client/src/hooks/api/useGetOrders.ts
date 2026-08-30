'use client';

import { useQuery } from '@tanstack/react-query';
import { type GetOrdersResponse } from '@shared/types/order.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const USE_GET_ORDERS_KEY = 'useGetOrders';

export const getOrders = async (): Promise<GetOrdersResponse> => {
  const { data } = await Api.get<GetOrdersResponse>(API_ROUTES.Orders);

  return data;
};

/** היסטוריית הזמנות — למסך הניהול בלבד. */
const useGetOrders = (isEnabled = true) =>
  useQuery({ queryKey: [USE_GET_ORDERS_KEY], queryFn: getOrders, enabled: isEnabled });

export default useGetOrders;
