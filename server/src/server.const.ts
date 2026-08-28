export const PORT = Number(process.env.APP_PORT ?? process.env.PORT ?? 3000);

/** Origin allowed to call the API — set `CLIENT_ORIGIN` in server/.env. */
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

/** Resend API key — create one at https://resend.com/api-keys */
export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';

/** Verified sender address configured in Resend. */
export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'ThaiLab <onboarding@resend.dev>';

/** Inbox that receives contact messages (and, later, orders). */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'hello@thailab.co.il';
