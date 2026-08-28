'use client';

import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      // ירוק־זית מרוכך מהלוגו — נוכחות אלגנטית ורגועה
      primary: { main: '#4A5138', light: '#6B7354', dark: '#333A26', contrastText: '#F7F3E9' },
      // פליז/זהב עתיק מהלוגו — צבע הפעולה לכל ה-CTA
      secondary: { main: '#B08D57', light: '#C9A978', dark: '#8C6E3F', contrastText: '#2E2A22' },
      background: { default: '#F7F3E9', paper: '#FFFCF5' },
      text: { primary: '#2E2A22', secondary: '#6E6552' },
      warning: { main: '#C9A978' },
      divider: 'rgba(74, 81, 56, 0.16)',
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: 'var(--font-sans)',
      h1: {
        fontFamily: 'var(--font-display)',
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '0.01em',
      },
      h2: {
        fontFamily: 'var(--font-display)',
        fontSize: '2.25rem',
        fontWeight: 700,
        letterSpacing: '0.01em',
      },
      h3: {
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
      },
      subtitle1: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.8 },
      body1: { fontSize: '1rem', lineHeight: 1.8 },
      body2: { fontSize: '0.875rem' },
      overline: { letterSpacing: '0.28em', fontWeight: 600 },
      button: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        textTransform: 'none',
        letterSpacing: '0.03em',
      },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 30, paddingBlock: 12, letterSpacing: '0.06em' },
          outlined: {
            borderWidth: 1.5,
            '&:hover': { borderWidth: 1.5, backgroundColor: 'rgba(74, 81, 56, 0.08)' },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: '1px solid rgba(74, 81, 56, 0.12)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
    },
  },
  heIL,
);

export default theme;
