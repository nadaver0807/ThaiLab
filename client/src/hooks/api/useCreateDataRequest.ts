'use client';

import { useMutation } from '@tanstack/react-query';
import { type MessageResponse } from '@shared/types/api.type';
import { type DataRequestForm } from '@shared/validations/dataRequest.validation';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const createDataRequest = async (payload: DataRequestForm): Promise<MessageResponse> => {
  const { data } = await Api.post<MessageResponse>(API_ROUTES.DataRequests, payload);

  return data;
};

const useCreateDataRequest = () => useMutation({ mutationFn: createDataRequest });

export default useCreateDataRequest;
