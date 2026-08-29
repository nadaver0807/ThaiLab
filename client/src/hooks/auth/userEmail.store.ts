const USER_EMAIL_STORAGE_KEY = 'thailab.userEmail';

type Listener = () => void;

const listeners = new Set<Listener>();

/**
 * עותק בזיכרון של הזהות. משמש כמקור האמת לרינדור, כך שגם אם ה-localStorage
 * חסום (גלישה פרטית / חסימת אחסון) הזיהוי ימשיך לעבוד עד לרענון הדף.
 */
let cachedEmail: string | null = null;
let isCacheLoaded = false;

const readStorage = (): string | null => {
  try {
    return window.localStorage.getItem(USER_EMAIL_STORAGE_KEY);
  } catch {
    // אחסון חסום — נסתמך על העותק שבזיכרון בלבד.
    return null;
  }
};

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

const handleStorageEvent = (event: StorageEvent): void => {
  if (event.key === USER_EMAIL_STORAGE_KEY) {
    cachedEmail = event.newValue;
    notify();
  }
};

/** מנוי לשינויי הזהות — כולל שינויים שנעשו בלשונית אחרת. */
export const subscribeToUserEmail = (listener: Listener): (() => void) => {
  listeners.add(listener);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', handleStorageEvent);
  };
};

/** קורא את זהות המשתמש הנוכחית. נקודת ההרחבה לחיבור ספק זהות אמיתי. */
export const getUserEmail = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  // טעינה עצלה מה-localStorage פעם אחת, ואז שמירה על ערך יציב לצורכי רינדור.
  if (!isCacheLoaded) {
    cachedEmail = readStorage();
    isCacheLoaded = true;
  }

  return cachedEmail;
};

/** בשרת אין זהות — תמיד `null`, כדי שה-hydration יתאים לרינדור הראשוני. */
export const getServerUserEmail = (): null => null;

export const setUserEmail = (email: string | null): void => {
  if (typeof window === 'undefined') {
    return;
  }

  cachedEmail = email;
  isCacheLoaded = true;

  try {
    if (email) {
      window.localStorage.setItem(USER_EMAIL_STORAGE_KEY, email);
    } else {
      window.localStorage.removeItem(USER_EMAIL_STORAGE_KEY);
    }
  } catch {
    // האחסון חסום — הזהות עדיין נשמרת בזיכרון עד לרענון הדף.
  }

  notify();
};
