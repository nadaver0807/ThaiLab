import { API_BASE_URL } from './api.const';

export const request = async <TResponse>(
  path: string,
  options?: RequestInit,
): Promise<TResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;

    throw new Error(body?.message ?? 'הבקשה נכשלה');
  }

  return response.json() as Promise<TResponse>;
};
