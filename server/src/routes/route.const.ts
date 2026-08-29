export const API_PREFIX = '/api';

export enum API_ROUTES {
  Dishes = '/dishes',
  SendEmail = '/send-email',
  Auth = '/auth',
}

export const HEALTH_ROUTE = '/health';

export type ApiRouteKey = keyof typeof API_ROUTES;
