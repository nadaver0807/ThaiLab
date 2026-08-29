import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { isAdminEmail } from '@/admin-user/adminUser.service';
import { verifySessionToken } from '@/util/sessionToken.util';

/**
 * מחלץ את האימייל של המשתמש המאומת מתוך אסימון ה-Bearer.
 *
 * הזהות נגזרת אך ורק מחתימת השרת — לקוח אינו יכול להצהיר על זהותו.
 * זו נקודת ההרחבה היחידה לחיבור ספק זהות חיצוני (MSAL / OAuth).
 */
export const extractUserEmail = (request: Request): string | null => {
  const header = request.header('authorization');

  if (!header?.startsWith('Bearer ')) {
    return null;
  }

  const token = header.slice('Bearer '.length).trim();

  return token ? verifySessionToken(token) : null;
};

/**
 * מזהה את המשתמש ומסמן אם הוא מנהל, בלי לחסום את הבקשה.
 * משמש נתיבים ציבוריים שצריכים להחזיר `isAdmin` ל-UI.
 */
export const attachUser = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    request.userEmail = extractUserEmail(request);
    request.isAdmin = await isAdminEmail(request.userEmail ?? null);

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * חוסם את הבקשה אם המשתמש אינו מנהל.
 * 401 כשאין משתמש מאומת, 403 כשהמשתמש מאומת אך אינו מנהל.
 */
export const requireAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const email = request.userEmail ?? extractUserEmail(request);

    if (!email) {
      response.status(StatusCodes.UNAUTHORIZED).json({ message: 'נדרשת התחברות' });

      return;
    }

    const isAdmin = request.isAdmin ?? (await isAdminEmail(email));

    if (!isAdmin) {
      response.status(StatusCodes.FORBIDDEN).json({ message: 'הפעולה מותרת למנהלים בלבד' });

      return;
    }

    request.userEmail = email;
    request.isAdmin = true;

    next();
  } catch (error) {
    next(error);
  }
};
