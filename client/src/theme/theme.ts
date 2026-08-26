'use client';

import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      // ירוק זית כהה מהסמל — נוכחות שקטה ויוקרתית
      primary: { main: '#2E3320', light: '#4A5133', dark: '#1A1A1A', contrastText: '#FAF6EE' },
      // אדום הצ'ילי מהסמל — צבע הפעולה לכל ה-CTA והקישורים
      secondary: { main: '#E31C24', light: '#F04A50', dark: '#B01218', contrastText: '#FFFFFF' },
      background: { default: '#F5F1E9', paper: '#FBF8F1' },
      text: { primary: '#212121', secondary: '#6A5B3E' },
      warning: { main: '#C9A567' },
      divider: 'rgba(33, 33, 33, 0.12)',
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
          root: { borderRadius: 2, paddingInline: 30, paddingBlock: 12, letterSpacing: '0.08em' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: '1px solid rgba(58, 63, 39, 0.1)',
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
