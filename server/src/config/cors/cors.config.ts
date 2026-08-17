/* eslint-disable no-constant-binary-expression */
export const CorsConfig = {
  allowedHeaders: [
    'Authorization',
    'content-type',
    'Access-Control-Expose-Headers',
    'api-subscription-key',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  origin: [
    process.env.LOCAL_CLIENT_URL ||
      'https://apim-gateway.digital.idf.il/internal/preprod/nifgaimportal' ||
      'https://api.digital.idf.il/external/preprod/nifgaimportal' ||
      '',
  ],
};
