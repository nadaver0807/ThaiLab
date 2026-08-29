import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

const SALT_BYTES = 16;
const KEY_LENGTH = 64;

/**
 * גיבוב סיסמה באמצעות scrypt. הפורמט המאוחסן הוא `salt:hash` (hex), כך
 * שהמלח נשמר לצד הגיבוב ואין צורך בעמודה נוספת.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(SALT_BYTES).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

  return `${salt}:${derivedKey.toString('hex')}`;
};

/**
 * מאמת סיסמה מול הגיבוב השמור. ההשוואה מתבצעת בזמן קבוע (`timingSafeEqual`)
 * כדי למנוע דליפת מידע דרך מדידת זמני תגובה.
 */
export const verifyPassword = async (password: string, storedHash: string): Promise<boolean> => {
  const [salt, hash] = storedHash.split(':');

  if (!salt || !hash) {
    return false;
  }

  const hashBuffer = Buffer.from(hash, 'hex');
  const derivedKey = (await scryptAsync(password, salt, hashBuffer.length)) as Buffer;

  if (derivedKey.length !== hashBuffer.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, hashBuffer);
};
