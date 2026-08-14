import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: 8,
};

const description: SxProps<Theme> = {
  marginBlockStart: 2,
  color: 'text.secondary',
};

const content: SxProps<Theme> = {
  marginBlockStart: 5,
};

const Styles = { section, description, content };

export default Styles;
