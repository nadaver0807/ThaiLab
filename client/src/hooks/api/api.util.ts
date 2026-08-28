import axios from 'axios';
import { API_BASE_URL } from './api.const';

/** Shape of the error body returned by the Express server. */
type ApiErrorBody = { message?: string };

const Api = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Normalises axios errors into a plain `Error` carrying the server's Hebrew
 * message, so components can render `error.message` directly.
 */
Api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<ApiErrorBody>(error)) {
      const message = error.response?.data?.message ?? 'הבקשה נכשלה';

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error instanceof Error ? error : new Error('הבקשה נכשלה'));
  },
);

export default Api;
