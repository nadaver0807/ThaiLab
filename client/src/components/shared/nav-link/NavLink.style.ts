import { type SxProps, type Theme } from '@mui/material';

const link: SxProps<Theme> = {
  color: 'warning.main',
  textDecoration: 'none',
  '&:hover': { color: 'text.primary' },
};

const Styles = { link };

export default Styles;
