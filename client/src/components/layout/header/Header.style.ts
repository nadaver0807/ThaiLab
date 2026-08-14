import { type SxProps, type Theme } from '@mui/material';

const appBar: SxProps<Theme> = {
  backgroundColor: 'background.default',
  borderBottom: 1,
  borderColor: 'divider',
};

const toolbar: SxProps<Theme> = {
  justifyContent: 'space-between',
  paddingInline: '0 !important',
};

const logo: SxProps<Theme> = {
  color: 'text.primary',
  textDecoration: 'none',
};

const nav: SxProps<Theme> = {
  display: { xs: 'none', sm: 'flex' },
  flexDirection: 'row',
  gap: 3,
};

const navLink: SxProps<Theme> = {
  color: 'text.secondary',
  textDecoration: 'none',
  '&:hover': { color: 'text.primary' },
};

const Styles = { appBar, toolbar, logo, nav, navLink };

export default Styles;
