import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: 12,
  textAlign: 'center',
};

const tagline: SxProps<Theme> = {
  color: 'text.secondary',
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
};

const title: SxProps<Theme> = {
  marginBlockStart: 2,
};

const description: SxProps<Theme> = {
  marginBlockStart: 3,
  marginInline: 'auto',
  maxWidth: 640,
  color: 'text.secondary',
};

const actions: SxProps<Theme> = {
  flexDirection: 'row',
  gap: 2,
  justifyContent: 'center',
  marginBlockStart: 5,
};

const Styles = { section, tagline, title, description, actions };

export default Styles;
