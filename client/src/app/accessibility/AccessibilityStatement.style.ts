import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  marginBottom: 4,
};

const title: SxProps<Theme> = {
  marginBottom: 1.5,
};

const paragraph: SxProps<Theme> = {
  marginBottom: 1,
  color: 'text.secondary',
};

const Styles = { section, title, paragraph };

export default Styles;
