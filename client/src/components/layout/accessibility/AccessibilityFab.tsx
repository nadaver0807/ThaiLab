'use client';

import { type FC } from 'react';
import { Fab } from '@mui/material';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import useAccessibility from '@/hooks/accessibility/useAccessibility';
import { ACCESSIBILITY_LABEL } from '@components/layout/accessibility/Accessibility.const';
import Styles from '@components/layout/accessibility/Accessibility.style';

const AccessibilityFab: FC = () => {
  const { open } = useAccessibility();

  return (
    <Fab
      aria-label={ACCESSIBILITY_LABEL}
      title={ACCESSIBILITY_LABEL}
      sx={Styles.fab}
      onClick={open}
    >
      <AccessibilityNewRoundedIcon />
    </Fab>
  );
};

export default AccessibilityFab;
