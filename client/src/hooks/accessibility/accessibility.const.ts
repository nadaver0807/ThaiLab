import { type AccessibilitySettings } from '@/hooks/accessibility/accessibility.type';

export const ACCESSIBILITY_STORAGE_KEY = 'thailab:accessibility';

export const MIN_FONT_SCALE = 1;

export const MAX_FONT_SCALE = 1.6;

export const FONT_SCALE_STEP = 0.1;

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  fontScale: MIN_FONT_SCALE,
  contrast: 'default',
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  bigCursor: false,
  reduceMotion: false,
};
