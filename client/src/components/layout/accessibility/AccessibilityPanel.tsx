'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Route } from '@shared/enums/route.enum';
import useAccessibility from '@/hooks/accessibility/useAccessibility';
import AccessibilityOptions from '@components/layout/accessibility/AccessibilityOptions';
import {
  ACCESSIBILITY_TITLE,
  DISPLAY_SECTION_LABEL,
  FONT_SECTION_LABEL,
  RESET_LABEL,
  STATEMENT_LABEL,
} from '@components/layout/accessibility/Accessibility.const';
import Styles from '@components/layout/accessibility/Accessibility.style';

const AccessibilityPanel: FC = () => {
  const {
    isOpen,
    close,
    reset,
    settings,
    increaseFont,
    decreaseFont,
    canIncreaseFont,
    canDecreaseFont,
  } = useAccessibility();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={close}
      slotProps={{ paper: { sx: Styles.paper } }}
      aria-label={ACCESSIBILITY_TITLE}
    >
      <Stack sx={Styles.header}>
        <Typography variant="h3" component="h2">
          {ACCESSIBILITY_TITLE}
        </Typography>
        <IconButton aria-label="סגירת תפריט הנגישות" onClick={close}>
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Typography variant="body2" sx={Styles.sectionLabel}>
        {FONT_SECTION_LABEL}
      </Typography>
      <Stack sx={Styles.fontRow}>
        <IconButton
          aria-label="הקטנת גודל הטקסט"
          disabled={!canDecreaseFont}
          onClick={decreaseFont}
        >
          <RemoveRoundedIcon />
        </IconButton>
        <Typography variant="body1" sx={Styles.fontValue} aria-live="polite">
          {Math.round(settings.fontScale * 100)}%
        </Typography>
        <IconButton
          aria-label="הגדלת גודל הטקסט"
          disabled={!canIncreaseFont}
          onClick={increaseFont}
        >
          <AddRoundedIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2" sx={Styles.sectionLabel}>
        {DISPLAY_SECTION_LABEL}
      </Typography>
      <AccessibilityOptions />
      <Stack sx={Styles.footer}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RestartAltRoundedIcon />}
          onClick={reset}
        >
          {RESET_LABEL}
        </Button>
        <Button component={NextLink} href={Route.Accessibility} color="primary" onClick={close}>
          {STATEMENT_LABEL}
        </Button>
      </Stack>
    </Drawer>
  );
};

export default AccessibilityPanel;
