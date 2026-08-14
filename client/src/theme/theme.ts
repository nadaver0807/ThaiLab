'use client';

import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      primary: { main: '#C1440E', contrastText: '#FFFFFF' },
      secondary: { main: '#1F6F4A' },
      background: { default: '#FFFFFF', paper: '#FAF9F7' },
      text: { primary: '#171717', secondary: '#6B6B6B' },
      divider: '#E8E5E0',
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'var(--font-sans)',
      h1: { fontSize: '3rem', fontWeight: 700, lineHeight: 1.15 },
      h2: { fontSize: '2.25rem', fontWeight: 700 },
      h3: { fontSize: '1.5rem', fontWeight: 600 },
      subtitle1: { fontSize: '1.125rem', fontWeight: 400 },
      body1: { fontSize: '1rem' },
      body2: { fontSize: '0.875rem' },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 999 } },
      },
    },
  },
  heIL,
);

export default theme;
