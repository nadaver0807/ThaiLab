import { createHmac, timingSafeEqual } from 'node:crypto';

import { ADMIN_SESSION_SECRET, ADMIN_SESSION_TTL_HOURS } from '@/server.const';

type TokenPayload = {
  /** האימייל של המנהל שאליו שייך האסימון. */
  email: string;
  /** חותמת פקיעה במילישניות. */
  expiresAt: number;
};

const base64UrlEncode = (value: string): string => Buffer.from(value, 'utf8').toString('base64url');

const base64UrlDecode = (value: string): string => Buffer.from(value, 'base64url').toString('utf8');

const sign = (payload: string): string =>
  createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest('base64url');

/**
 * יוצר אסימון חתום בפורמט `payload.signature`.
 * החתימה מבטיחה שהלקוח אינו יכול לזייף זהות או להאריך את תוקף ההרשאה.
 */
export const createSessionToken = (email: string): string => {
  const payload: TokenPayload = {
    email,
    expiresAt: Date.now() + ADMIN_SESSION_TTL_HOURS * 60 * 60 * 1000,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  return `${encodedPayload}.${sign(encodedPayload)}`;
};

/**
 * מאמת אסימון ומחזיר את האימייל שבתוכו, או `null` אם החתימה שגויה או שפג התוקף.
 */
export const verifySessionToken = (token: string): string | null => {
  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as TokenPayload;

    if (typeof payload.email !== 'string' || typeof payload.expiresAt !== 'number') {
      return null;
    }

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload.email;
  } catch {
    return null;
  }
};
