import { type SxProps, type Theme } from '@mui/material';

const button: SxProps<Theme> = {
  whiteSpace: 'nowrap',
  fontWeight: 700,
  boxShadow: '0 12px 28px -12px rgba(140, 110, 63, 0.75)',
  '&:hover': {
    boxShadow: '0 16px 34px -12px rgba(140, 110, 63, 0.9)',
    transform: 'translateY(-1px)',
  },
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
};

const icon: SxProps<Theme> = {
  marginInlineEnd: 0.5,
};

const Styles = { button, icon };

export default Styles;
