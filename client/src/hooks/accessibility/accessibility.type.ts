export type ContrastMode = 'default' | 'high' | 'dark';

export type AccessibilitySettings = {
  fontScale: number;
  contrast: ContrastMode;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  reduceMotion: boolean;
};

export type AccessibilityToggleKey =
  | 'grayscale'
  | 'highlightLinks'
  | 'readableFont'
  | 'bigCursor'
  | 'reduceMotion';
