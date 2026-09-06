import { type SxProps, type Theme } from '@mui/material';

const card: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  borderRadius: 2,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 24px 48px -32px rgba(74,81,56,0.6)' },
};

const image = (url: string): SxProps<Theme> => ({
  height: 190,
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const body: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: 1.5,
  padding: 3,
};

const badge: SxProps<Theme> = {
  alignSelf: 'flex-start',
  fontWeight: 600,
  letterSpacing: '0.12em',
};

const title: SxProps<Theme> = {
  fontWeight: 600,
};

const summary: SxProps<Theme> = {
  color: 'text.secondary',
};

const highlights: SxProps<Theme> = {
  gap: 0.75,
  marginBlockStart: 0.5,
};

const highlight: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
  color: 'text.secondary',
};

const highlightIcon: SxProps<Theme> = {
  fontSize: 18,
  color: 'secondary.main',
};

const action: SxProps<Theme> = {
  marginBlockStart: 'auto',
  paddingBlockStart: 2,
};

const Styles = {
  card,
  image,
  body,
  badge,
  title,
  summary,
  highlights,
  highlight,
  highlightIcon,
  action,
};

export default Styles;
