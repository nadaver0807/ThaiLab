'use client';

import { useMutation } from '@tanstack/react-query';
import { type CustomerLookupResponse } from '@shared/types/order.type';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const lookupCustomer = async (phone: string): Promise<CustomerLookupResponse> => {
  const { data } = await Api.get<CustomerLookupResponse>(API_ROUTES.CustomerLookup, {
    params: { phone },
  });

  return data;
};

const useLookupCustomer = () => useMutation({ mutationFn: lookupCustomer });

export default useLookupCustomer;
