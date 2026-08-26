import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlockStart: { xs: 12, md: 16 },
  paddingBlockEnd: { xs: 8, md: 10 },
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
