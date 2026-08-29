import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

type Attempt = { count: number; resetAt: number };

const attempts = new Map<string, Attempt>();

/**
 * הגבלת קצב לניסיונות התחברות, כדי לחסום ניחוש סיסמאות בכוח גס.
 * המצב נשמר בזיכרון — מספיק למופע יחיד; בפריסה מרובת מופעים יש להעביר ל-Redis.
 */
export const loginRateLimiter = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const key = request.ip ?? 'unknown';
  const now = Date.now();
  const attempt = attempts.get(key);

  if (!attempt || now > attempt.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });

    next();

    return;
  }

  if (attempt.count >= MAX_ATTEMPTS) {
    response
      .status(StatusCodes.TOO_MANY_REQUESTS)
      .json({ message: 'יותר מדי ניסיונות התחברות. יש לנסות שוב מאוחר יותר.' });

    return;
  }

  attempt.count += 1;

  next();
};

/** מאפסת את מונה הניסיונות לאחר התחברות מוצלחת. */
export const resetLoginAttempts = (request: Pick<Request, 'ip'>): void => {
  attempts.delete(request.ip ?? 'unknown');
};
