export const API_PREFIX = '/api';

export enum API_ROUTES {
  Dishes = '/dishes',
  SendEmail = '/send-email',
  Auth = '/auth',
  Orders = '/orders',
  Customers = '/customers',
  Reviews = '/reviews',
  Payments = '/payments',
}

export const HEALTH_ROUTE = '/health';

export type ApiRouteKey = keyof typeof API_ROUTES;
