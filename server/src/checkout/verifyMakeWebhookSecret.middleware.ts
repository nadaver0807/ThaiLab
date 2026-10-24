import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MAKE_WEBHOOK_SECRET, MAKE_WEBHOOK_SECRET_HEADER } from '@/server.const';

/**
 * מוודא שקריאת ה-webhook אכן מגיעה מ-Make, לפי סוד משותף שנשלח ב-header.
 * אם `MAKE_WEBHOOK_SECRET` לא הוגדר (סביבת פיתוח), הבדיקה פסיבית ולא חוסמת.
 */
export const verifyMakeWebhookSecret = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  if (!MAKE_WEBHOOK_SECRET) {
    next();

    return;
  }

  const providedSecret = request.header(MAKE_WEBHOOK_SECRET_HEADER);

  if (providedSecret !== MAKE_WEBHOOK_SECRET) {
    response.status(StatusCodes.UNAUTHORIZED).json({ message: 'חתימת webhook אינה תקינה' });

    return;
  }

  next();
};
