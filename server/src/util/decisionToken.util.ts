import { createHmac, timingSafeEqual } from 'node:crypto';

import { ADMIN_SESSION_SECRET } from '@/server.const';

export enum OrderDecision {
  Confirm = 'confirm',
  Reject = 'reject',
}

export const createDecisionToken = (orderUuid: string, decision: OrderDecision): string =>
  createHmac('sha256', ADMIN_SESSION_SECRET).update(`${orderUuid}:${decision}`).digest('base64url');

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
