import { createHmac, timingSafeEqual } from 'node:crypto';

import { ADMIN_SESSION_SECRET } from '@/server.const';

export enum OrderDecision {
  Confirm = 'confirm',
  Reject = 'reject',
}

/** מטרת קישור התשלום ללקוח — מופרדת מהחלטות המנהל כדי שטוקן אחד לא יתקבל במקום אחר. */
const PAYMENT_PURPOSE = 'pay';

const sign = (orderUuid: string, purpose: string): string =>
  createHmac('sha256', ADMIN_SESSION_SECRET).update(`${orderUuid}:${purpose}`).digest('base64url');

const isValid = (expected: string, token: string): boolean => {
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return (
    tokenBuffer.length === expectedBuffer.length && timingSafeEqual(tokenBuffer, expectedBuffer)
  );
};

export const createDecisionToken = (orderUuid: string, decision: OrderDecision): string =>
  sign(orderUuid, decision);

export const createPaymentToken = (orderUuid: string): string => sign(orderUuid, PAYMENT_PURPOSE);

export const verifyPaymentToken = (orderUuid: string, token: string): boolean =>
  isValid(createPaymentToken(orderUuid), token);

export const verifyDecisionToken = (
  orderUuid: string,
  decision: OrderDecision,
  token: string,
): boolean => {
  const expected = createDecisionToken(orderUuid, decision);
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  if (tokenBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(tokenBuffer, expectedBuffer);
};
