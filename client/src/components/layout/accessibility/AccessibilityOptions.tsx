'use client';

import { type FC } from 'react';
import { Box, Button } from '@mui/material';
import useAccessibility from '@/hooks/accessibility/useAccessibility';
import {
  CONTRAST_OPTIONS,
  TOGGLE_OPTIONS,
} from '@components/layout/accessibility/Accessibility.const';
import Styles from '@components/layout/accessibility/Accessibility.style';

const AccessibilityOptions: FC = () => {
  const { settings, toggle, setContrast } = useAccessibility();

  return (
    <Box sx={Styles.optionsGrid}>
      {CONTRAST_OPTIONS.map(({ mode, label, Icon }) => (
        <Button
          key={mode}
          variant={settings.contrast === mode ? 'contained' : 'outlined'}
          color="primary"
          aria-pressed={settings.contrast === mode}
          startIcon={<Icon />}
          sx={Styles.optionButton}
          onClick={() => setContrast(mode)}
        >
          {label}
        </Button>
      ))}
      {TOGGLE_OPTIONS.map(({ key, label, Icon }) => (
        <Button
          key={key}
          variant={settings[key] ? 'contained' : 'outlined'}
          color="primary"
          aria-pressed={settings[key]}
          startIcon={<Icon />}
          sx={Styles.optionButton}
          onClick={() => toggle(key)}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default AccessibilityOptions;
