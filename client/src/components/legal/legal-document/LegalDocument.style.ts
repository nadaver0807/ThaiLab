import { type SxProps, type Theme } from '@mui/material';

const updated: SxProps<Theme> = {
  marginBlockEnd: 4,
  color: 'text.secondary',
};

const section: SxProps<Theme> = {
  marginBlockEnd: 4,
};

const title: SxProps<Theme> = {
  marginBlockEnd: 1.5,
};

const paragraph: SxProps<Theme> = {
  marginBlockEnd: 1,
  color: 'text.secondary',
};

const business: SxProps<Theme> = {
  marginBlockStart: 6,
  paddingBlockStart: 3,
  borderBlockStart: '1px solid',
  borderColor: 'divider',
};

const Styles = { updated, section, title, paragraph, business };

export default Styles;
