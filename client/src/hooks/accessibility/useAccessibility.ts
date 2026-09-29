'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import {
  closeAccessibility,
  getAccessibilitySettings,
  getIsAccessibilityOpen,
  getServerAccessibilitySettings,
  getServerIsAccessibilityOpen,
  hydrateAccessibility,
  openAccessibility,
  resetAccessibility,
  subscribeToAccessibility,
  updateAccessibility,
} from '@/hooks/accessibility/accessibility.store';
import {
  FONT_SCALE_STEP,
  MAX_FONT_SCALE,
  MIN_FONT_SCALE,
} from '@/hooks/accessibility/accessibility.const';
import {
  type AccessibilitySettings,
  type AccessibilityToggleKey,
  type ContrastMode,
} from '@/hooks/accessibility/accessibility.type';

const useAccessibility = () => {
  const settings = useSyncExternalStore(
    subscribeToAccessibility,
    getAccessibilitySettings,
    getServerAccessibilitySettings,
  );

  const isOpen = useSyncExternalStore(
    subscribeToAccessibility,
    getIsAccessibilityOpen,
    getServerIsAccessibilityOpen,
  );

  useEffect(() => {
    hydrateAccessibility();
  }, []);

  const open = useCallback(() => openAccessibility(), []);
  const close = useCallback(() => closeAccessibility(), []);
  const reset = useCallback(() => resetAccessibility(), []);

  const update = useCallback(
    (patch: Partial<AccessibilitySettings>) => updateAccessibility(patch),
    [],
  );

  const increaseFont = useCallback(() => {
    const { fontScale } = getAccessibilitySettings();

    updateAccessibility({ fontScale: fontScale + FONT_SCALE_STEP });
  }, []);

  const decreaseFont = useCallback(() => {
    const { fontScale } = getAccessibilitySettings();

    updateAccessibility({ fontScale: fontScale - FONT_SCALE_STEP });
  }, []);

  const setContrast = useCallback(
    (contrast: ContrastMode) =>
      updateAccessibility({
        contrast: getAccessibilitySettings().contrast === contrast ? 'default' : contrast,
      }),
    [],
  );

  const toggle = useCallback((key: AccessibilityToggleKey) => {
    updateAccessibility({ [key]: !getAccessibilitySettings()[key] });
  }, []);

  return {
    settings,
    isOpen,
    open,
    close,
    reset,
    update,
    toggle,
    setContrast,
    increaseFont,
    decreaseFont,
    canIncreaseFont: settings.fontScale < MAX_FONT_SCALE,
    canDecreaseFont: settings.fontScale > MIN_FONT_SCALE,
  };
};

export default useAccessibility;
