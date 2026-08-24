import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  backgroundColor: 'background.default',
  paddingBlock: { xs: 8, md: 12 },
};

const card: SxProps<Theme> = {
  position: 'relative',
  backgroundColor: 'primary.light',
  borderRadius: 4,
  padding: { xs: 3, md: 8 },
  border: '10px solid',
  borderColor: '#B08D57',
  boxShadow: '0 24px 60px -30px rgba(85,107,47,0.5)',
};

const text: SxProps<Theme> = {
  gap: 2,
  maxWidth: 760,
  marginInline: 'auto',
  textAlign: 'center',
};

const tagline: SxProps<Theme> = {
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'text.primary',
};

const title: SxProps<Theme> = {
  color: 'text.primary',
  fontWeight: 800,
};

const paragraph: SxProps<Theme> = {
  color: 'text.primary',
};

const action: SxProps<Theme> = {
  marginBlockStart: 2,
  display: 'flex',
  justifyContent: 'center',
};

const Styles = { section, card, text, tagline, title, paragraph, action };

export default Styles;
