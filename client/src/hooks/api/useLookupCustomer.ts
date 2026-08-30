'use client';

import { useQuery } from '@tanstack/react-query';
import { type CustomerLookupResponse } from '@shared/types/order.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const USE_LOOKUP_CUSTOMER_KEY = 'useLookupCustomer';

export const lookupCustomer = async (phone: string): Promise<CustomerLookupResponse> => {
  const { data } = await Api.get<CustomerLookupResponse>(API_ROUTES.CustomerLookup, {
    params: { phone },
  });

  return data;
};

const useLookupCustomer = (phone: string, isEnabled: boolean) =>
  useQuery({
    queryKey: [USE_LOOKUP_CUSTOMER_KEY, phone],
    queryFn: () => lookupCustomer(phone),
    enabled: isEnabled,
    staleTime: Infinity,
    retry: false,
  });

export default useLookupCustomer;
