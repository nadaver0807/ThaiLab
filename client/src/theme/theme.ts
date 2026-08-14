'use client';

import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      primary: { main: '#A32A1E', light: '#C8503F', dark: '#7A1B12', contrastText: '#FFFFFF' },
      secondary: { main: '#5C7A29', light: '#8CAD4F', dark: '#3F5619', contrastText: '#FFFFFF' },
      background: { default: '#FBF7F1', paper: '#FFFFFF' },
      text: { primary: '#2B1D14', secondary: '#7A6A5C' },
      divider: '#E6DCCE',
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'var(--font-sans)',
      h1: { fontSize: '3rem', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontSize: '1.5rem', fontWeight: 600 },
      subtitle1: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.7 },
      body1: { fontSize: '1rem', lineHeight: 1.75 },
      body2: { fontSize: '0.875rem' },
      button: { fontWeight: 600, textTransform: 'none' },
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
