'use client';

import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_OPENING_HOURS } from '@shared/consts/schedule.const';
import { buildOpeningHoursRows, type OpeningHoursRow } from '@shared/util/opening-hours.util';
import { type GetOpeningHoursResponse } from '@shared/types/opening-hours.type';
import { type UpdateOpeningHoursPayload } from '@shared/validations/opening-hours.validation';
import Api from './api.util';
import { API_ROUTES } from './api.const';

export const USE_GET_OPENING_HOURS_KEY = 'useGetOpeningHours';

/** אם הבקשה נכשלה או עדיין נטענת, מחזיר את ברירת המחדל כדי שהצ'קאאוט לא ייתקע. */
export const useGetOpeningHours = () => {
  const query = useQuery({
    queryKey: [USE_GET_OPENING_HOURS_KEY],
    queryFn: async () => (await Api.get<GetOpeningHoursResponse>(API_ROUTES.OpeningHours)).data,
  });

  return { ...query, days: query.data?.days ?? DEFAULT_OPENING_HOURS };
};

/** שורות מוכנות להצגה בפוטר ובעמוד יצירת הקשר. */
export const useOpeningHoursRows = (): OpeningHoursRow[] => {
  const { days } = useGetOpeningHours();

  return useMemo(() => buildOpeningHoursRows(days), [days]);
};

export const useUpdateOpeningHours = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateOpeningHoursPayload) =>
      (await Api.put<GetOpeningHoursResponse>(API_ROUTES.OpeningHours, payload)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [USE_GET_OPENING_HOURS_KEY] }),
  });
};
