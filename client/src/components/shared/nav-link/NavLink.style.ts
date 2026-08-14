import { type SxProps, type Theme } from '@mui/material';

const link: SxProps<Theme> = {
  color: 'text.secondary',
  textDecoration: 'none',
  '&:hover': { color: 'text.primary' },
};

const Styles = { link };

export default Styles;
