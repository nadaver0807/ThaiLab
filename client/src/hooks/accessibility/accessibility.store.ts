import {
  ACCESSIBILITY_STORAGE_KEY,
  DEFAULT_ACCESSIBILITY_SETTINGS,
  MAX_FONT_SCALE,
  MIN_FONT_SCALE,
} from '@/hooks/accessibility/accessibility.const';
import { type AccessibilitySettings } from '@/hooks/accessibility/accessibility.type';

type Listener = () => void;

const listeners = new Set<Listener>();

let settings: AccessibilitySettings = DEFAULT_ACCESSIBILITY_SETTINGS;

let isOpen = false;

const clampFontScale = (value: number): number =>
  Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE, Number(value.toFixed(2))));

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

const applyToDocument = (): void => {
  if (typeof document === 'undefined') return;

  const { documentElement } = document;
  const { dataset, style } = documentElement;

  style.setProperty('--a11y-font-scale', String(settings.fontScale));
  dataset.a11yContrast = settings.contrast;
  dataset.a11yGrayscale = String(settings.grayscale);
  dataset.a11yHighlightLinks = String(settings.highlightLinks);
  dataset.a11yReadableFont = String(settings.readableFont);
  dataset.a11yBigCursor = String(settings.bigCursor);
  dataset.a11yReduceMotion = String(settings.reduceMotion);
};

const persist = (): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // אחסון חסום (מצב פרטי) — ההעדפות פשוט לא יישמרו בין ביקורים.
  }
};

const setSettings = (next: AccessibilitySettings): void => {
  settings = { ...next, fontScale: clampFontScale(next.fontScale) };
  applyToDocument();
  persist();
  notify();
};

export const subscribeToAccessibility = (listener: Listener): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const getAccessibilitySettings = (): AccessibilitySettings => settings;

export const getServerAccessibilitySettings = (): AccessibilitySettings =>
  DEFAULT_ACCESSIBILITY_SETTINGS;

export const getIsAccessibilityOpen = (): boolean => isOpen;

export const getServerIsAccessibilityOpen = (): boolean => false;

export const openAccessibility = (): void => {
  isOpen = true;
  notify();
};

export const closeAccessibility = (): void => {
  isOpen = false;
  notify();
};

export const updateAccessibility = (patch: Partial<AccessibilitySettings>): void => {
  setSettings({ ...settings, ...patch });
};

export const resetAccessibility = (): void => {
  setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
};

/** נטען פעם אחת בעלייה של הלקוח כדי לשחזר את ההעדפות השמורות. */
export const hydrateAccessibility = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const raw = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;

      settings = {
        ...DEFAULT_ACCESSIBILITY_SETTINGS,
        ...parsed,
        fontScale: clampFontScale(parsed.fontScale ?? MIN_FONT_SCALE),
      };
    }
  } catch {
    settings = DEFAULT_ACCESSIBILITY_SETTINGS;
  }

  applyToDocument();
  notify();
};
