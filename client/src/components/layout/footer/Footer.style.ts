import { type SxProps, type Theme } from '@mui/material';

const footer: SxProps<Theme> = {
  backgroundColor: '#FFFDF5',
  borderTop: 1,
  borderColor: 'divider',
  marginBlockStart: 'auto',
  color: 'text.primary',
};

const grid: SxProps<Theme> = {
  display: 'grid',
  gap: 4,
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
  paddingBlock: 6,
};

const brand: SxProps<Theme> = {
  fontWeight: 800,
  letterSpacing: '0.1em',
  color: 'text.primary',
};

const tagline: SxProps<Theme> = {
  marginBlockStart: 1,
  color: 'text.primary',
};

const columnTitle: SxProps<Theme> = {
  fontWeight: 700,
  marginBlockEnd: 1,
  color: 'text.primary',
};

const nav: SxProps<Theme> = {
  gap: 1,
};

const navLink: SxProps<Theme> = {
  color: 'text.primary',
  textDecoration: 'none',
  '&:hover': { color: 'secondary.main' },
};

const hours: SxProps<Theme> = {
  gap: 0.5,
  color: 'text.primary',
};

const contact: SxProps<Theme> = {
  gap: 0.5,
  color: 'text.primary',
};

const copyright: SxProps<Theme> = {
  borderTop: 1,
  borderColor: 'divider',
  paddingBlock: 2,
  textAlign: 'center',
  color: 'text.primary',
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
