import { CLIENT_ORIGIN } from '../../server.const';

/**
 * מקורות מותרים — `CLIENT_ORIGIN` יכול להכיל כמה כתובות מופרדות בפסיק,
 * כדי לתמוך גם ב-thailab.co.il וגם ב-www.thailab.co.il.
 */
const ALLOWED_ORIGINS = CLIENT_ORIGIN.split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

/**
 * CORS policy — the browser only allows the client origins declared in
 * `CLIENT_ORIGIN` (see server/.env).
 */
export const CorsConfig = {
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  origin: ALLOWED_ORIGINS,
};
