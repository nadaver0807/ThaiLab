import { type SxProps, type Theme } from '@mui/material';

const footer: SxProps<Theme> = {
  backgroundColor: 'primary.dark',
  borderTop: '1px solid rgba(176,141,87,0.3)',
  marginBlockStart: 'auto',
  color: 'common.white',
};

const grid: SxProps<Theme> = {
  display: 'grid',
  gap: 4,
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
  paddingBlock: 8,
};

const brand: SxProps<Theme> = {
  fontFamily: 'var(--font-brand)',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'common.white',
};

const tagline: SxProps<Theme> = {
  marginBlockStart: 1,
  color: 'warning.main',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

const columnTitle: SxProps<Theme> = {
  fontWeight: 700,
  marginBlockEnd: 1,
  color: 'common.white',
};

const nav: SxProps<Theme> = {
  gap: 1,
};

const navLink: SxProps<Theme> = {
  color: 'rgba(255,255,255,0.82)',
  textDecoration: 'none',
  '&:hover': { color: 'secondary.main' },
};

const hours: SxProps<Theme> = {
  gap: 0.5,
  color: 'rgba(255,255,255,0.82)',
};

const contact: SxProps<Theme> = {
  gap: 0.5,
  color: 'rgba(255,255,255,0.82)',
};

const copyright: SxProps<Theme> = {
  borderTop: '1px solid rgba(255,255,255,0.12)',
  paddingBlock: 2,
  textAlign: 'center',
  color: 'rgba(255,255,255,0.7)',
};

const Styles = {
  footer,
  grid,
  brand,
  tagline,
  columnTitle,
  nav,
  navLink,
  hours,
  contact,
  copyright,
};

export default Styles;
