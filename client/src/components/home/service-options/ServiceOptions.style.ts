import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: { xs: 8, md: 12 },
  backgroundColor: 'background.default',
};

const intro: SxProps<Theme> = {
  textAlign: 'center',
  marginBlockEnd: { xs: 5, md: 7 },
};

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'secondary.dark',
};

const title: SxProps<Theme> = {
  marginBlockStart: 1,
};

const description: SxProps<Theme> = {
  marginBlockStart: 2,
  marginInline: 'auto',
  maxWidth: 620,
  color: 'text.secondary',
};

const grid: SxProps<Theme> = {
  display: 'grid',
  gap: { xs: 3, md: 4 },
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  alignItems: 'stretch',
};

const Styles = { section, intro, tagline, title, description, grid };

export default Styles;
