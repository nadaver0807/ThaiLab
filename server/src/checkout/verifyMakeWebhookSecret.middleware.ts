import { timingSafeEqual } from 'node:crypto';
import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MAKE_WEBHOOK_SECRET, MAKE_WEBHOOK_SECRET_HEADER, PAYMENT_PROVIDER } from '@/server.const';
import { PaymentProvider } from '@shared/enums/payment-provider.enum';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const isSameSecret = (provided: string, expected: string): boolean => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
};

/**
 * מוודא שקריאת ה-webhook אכן מגיעה מ-Make, לפי סוד משותף שנשלח ב-header.
 * חל רק כשהספק הפעיל הוא Make — ספקים אחרים מאמתים את התשלום מול הספק עצמו.
 * בפרודקשן הסוד חובה: בלעדיו כל אחד יכול לסמן הזמנה כשולמה.
 */
export const verifyMakeWebhookSecret = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  if (PAYMENT_PROVIDER !== PaymentProvider.Make) {
    next();

    return;
  }

  if (!MAKE_WEBHOOK_SECRET) {
    if (IS_PRODUCTION) {
      response.status(StatusCodes.UNAUTHORIZED).json({ message: 'MAKE_WEBHOOK_SECRET חסר' });

      return;
    }

    next();

    return;
  }

  if (!isSameSecret(request.header(MAKE_WEBHOOK_SECRET_HEADER) ?? '', MAKE_WEBHOOK_SECRET)) {
    response.status(StatusCodes.UNAUTHORIZED).json({ message: 'חתימת webhook אינה תקינה' });

    return;
  }

  next();
};
