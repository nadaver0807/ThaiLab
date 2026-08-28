import { CLIENT_ORIGIN } from '../../server.const';

/**
 * CORS policy — the browser only allows the client origin declared in
 * `CLIENT_ORIGIN` (see server/.env).
 */
export const CorsConfig = {
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  origin: CLIENT_ORIGIN,
};
