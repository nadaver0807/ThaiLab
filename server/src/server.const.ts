import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.APP_PORT ?? process.env.PORT ?? 3000);

/** Origin allowed to call the API — set `CLIENT_ORIGIN` in server/.env. */
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

/** Resend API key — create one at https://resend.com/api-keys */
export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';

/** Verified sender address configured in Resend. */
export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'ThaiLab <onboarding@resend.dev>';

/** Inbox that receives contact messages and new orders. */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'ofershazar22@gmail.com';

/** Public base URL of this API — used to build the order approval links sent by email. */
export const SERVER_PUBLIC_URL = (
  process.env.SERVER_PUBLIC_URL ?? `http://localhost:${PORT}`
).replace(/\/$/, '');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const resolveSessionSecret = (): string => {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (secret) {
    return secret;
  }

  if (IS_PRODUCTION) {
    throw new Error('ADMIN_SESSION_SECRET is required in production');
  }

  return 'dev-only-insecure-session-secret';
};

export const ADMIN_SESSION_SECRET = resolveSessionSecret();

/** תוקף אסימון ההתחברות בשעות. */
export const ADMIN_SESSION_TTL_HOURS = Number(process.env.ADMIN_SESSION_TTL_HOURS ?? 12);
