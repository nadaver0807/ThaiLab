import axios from 'axios';
import { API_BASE_URL } from './api.const';
import { getSessionToken, setSession } from '@/hooks/auth/session.store';

type ApiErrorBody = { message?: string };

const Api = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

Api.interceptors.request.use((config) => {
  const token = getSessionToken();

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

Api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<ApiErrorBody>(error)) {
      // אסימון שפג תוקפו או נפסל — ניקוי ההתחברות המקומית כדי למנוע מצב "תקוע".
      if (error.response?.status === 401) {
        setSession(null);
      }

      const message = error.response?.data?.message ?? 'הבקשה נכשלה';

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error instanceof Error ? error : new Error('הבקשה נכשלה'));
  },
);

export default Api;
