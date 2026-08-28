import { type SxProps, type Theme } from '@mui/material';

const layout: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: 4, md: 6 },
  alignItems: 'flex-start',
};

const details: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  flex: 1,
};

const group: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
};

const groupTitle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'secondary.main',
};

const phoneLink: SxProps<Theme> = {
  color: 'text.primary',
  textDecoration: 'none',
  fontWeight: 700,
  '&:hover': { color: 'secondary.main' },
};

const Styles = { layout, details, group, groupTitle, phoneLink };

export default Styles;
