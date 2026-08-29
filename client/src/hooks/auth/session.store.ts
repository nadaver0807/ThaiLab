import { type Session } from '@shared/types/auth.type';

const SESSION_STORAGE_KEY = 'thailab.adminSession';

type Listener = () => void;

const listeners = new Set<Listener>();

let cachedSession: Session | null = null;
let isCacheLoaded = false;

const parseSession = (raw: string | null): Session | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<Session>;

    if (typeof parsed.email === 'string' && typeof parsed.token === 'string') {
      return { email: parsed.email, token: parsed.token };
    }

    return null;
  } catch {
    return null;
  }
};

const readStorage = (): Session | null => {
  try {
    return parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
  } catch {
    return null;
  }
};

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

const handleStorageEvent = (event: StorageEvent): void => {
  if (event.key === SESSION_STORAGE_KEY) {
    cachedSession = parseSession(event.newValue);
    notify();
  }
};

export const subscribeToSession = (listener: Listener): (() => void) => {
  listeners.add(listener);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', handleStorageEvent);
  };
};

export const getSession = (): Session | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isCacheLoaded) {
    cachedSession = readStorage();
    isCacheLoaded = true;
  }

  return cachedSession;
};

export const getServerSession = (): null => null;

export const getSessionToken = (): string | null => getSession()?.token ?? null;

export const setSession = (session: Session | null): void => {
  if (typeof window === 'undefined') {
    return;
  }

  cachedSession = session;
  isCacheLoaded = true;

  try {
    if (session) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch {
    // האחסון חסום — ההתחברות עדיין נשמרת בזיכרון עד לרענון הדף.
  }

  notify();
};
