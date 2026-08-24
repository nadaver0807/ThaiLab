'use client';

import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      primary: { main: '#8BC34A', light: '#AED581', dark: '#558B2F', contrastText: '#0A0A0A' },
      secondary: { main: '#556B2F', light: '#7A8B3F', dark: '#3E4E22', contrastText: '#FFFFFF' },
      background: { default: '#E0F7FA', paper: '#FFFFFF' },
      text: { primary: '#0A0A0A', secondary: '#2E3B1E' },
      divider: '#C5E1A5',
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'var(--font-sans)',
      h1: {
        fontFamily: 'var(--font-display)',
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontFamily: 'var(--font-display)',
        fontSize: '2.25rem',
        fontWeight: 700,
        letterSpacing: '0em',
      },
      h3: { fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 },
      subtitle1: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.7 },
      body1: { fontSize: '1rem', lineHeight: 1.75 },
      body2: { fontSize: '0.875rem' },
      button: { fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'none' },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 999, paddingInline: 24 } },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
    },
  },
  heIL,
);

export default theme;
