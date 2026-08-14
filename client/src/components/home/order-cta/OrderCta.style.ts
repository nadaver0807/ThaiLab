import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: { xs: 8, md: 12 },
  backgroundColor: 'text.primary',
  color: 'common.white',
  textAlign: 'center',
};

const title: SxProps<Theme> = {
  color: 'common.white',
};

const description: SxProps<Theme> = {
  marginBlockStart: 2,
  marginInline: 'auto',
  maxWidth: 560,
  color: 'grey.400',
};

const actions: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
  justifyContent: 'center',
  marginBlockStart: 4,
};

const Styles = { section, title, description, actions };

export default Styles;
