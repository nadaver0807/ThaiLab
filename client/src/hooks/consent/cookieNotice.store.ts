const COOKIE_NOTICE_STORAGE_KEY = 'thailab.cookie-notice.v1';

type Listener = () => void;

const listeners = new Set<Listener>();

/** גיבוי בזיכרון — כשהאחסון חסום (מצב פרטי) ההודעה עדיין נסגרת למשך הביקור. */
let isDismissedInMemory = false;

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

export const subscribeToCookieNotice = (listener: Listener): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const getIsCookieNoticeDismissed = (): boolean => {
  if (isDismissedInMemory) return true;

  try {
    return window.localStorage.getItem(COOKIE_NOTICE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

/** בשרת ההודעה מוסתרת, כדי שלא תהבהב לפני ההידרציה. */
export const getServerIsCookieNoticeDismissed = (): boolean => true;

export const dismissCookieNotice = (): void => {
  isDismissedInMemory = true;

  try {
    window.localStorage.setItem(COOKIE_NOTICE_STORAGE_KEY, 'true');
  } catch {
    // אחסון חסום — ההודעה תופיע שוב בביקור הבא.
  }

  notify();
};
