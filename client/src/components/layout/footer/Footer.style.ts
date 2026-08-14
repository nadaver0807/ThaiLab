import { type SxProps, type Theme } from '@mui/material';

const footer: SxProps<Theme> = {
  backgroundColor: 'background.paper',
  borderTop: 1,
  borderColor: 'divider',
  marginBlockStart: 'auto',
};

const grid: SxProps<Theme> = {
  display: 'grid',
  gap: 4,
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
  paddingBlock: 6,
};

const tagline: SxProps<Theme> = {
  marginBlockStart: 1,
  color: 'text.secondary',
};

const nav: SxProps<Theme> = {
  gap: 1,
};

const navLink: SxProps<Theme> = {
  color: 'text.secondary',
  textDecoration: 'none',
  '&:hover': { color: 'text.primary' },
};

const address: SxProps<Theme> = {
  fontStyle: 'normal',
  color: 'text.secondary',
};

const copyright: SxProps<Theme> = {
  borderTop: 1,
  borderColor: 'divider',
  paddingBlock: 2,
  textAlign: 'center',
  color: 'text.secondary',
};

const Styles = { footer, grid, tagline, nav, navLink, address, copyright };

export default Styles;
