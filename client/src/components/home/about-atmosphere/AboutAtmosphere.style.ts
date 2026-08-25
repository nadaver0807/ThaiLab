import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  backgroundColor: 'background.default',
  paddingBlock: { xs: 8, md: 14 },
};

const card: SxProps<Theme> = {
  position: 'relative',
  backgroundColor: 'primary.dark',
  borderRadius: 2,
  padding: { xs: 4, md: 9 },
  border: '1px solid',
  borderColor: 'rgba(176, 141, 87, 0.5)',
  boxShadow: '0 40px 80px -40px rgba(0,0,0,0.7)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 12,
    border: '1px solid rgba(176, 141, 87, 0.35)',
    borderRadius: 1,
    pointerEvents: 'none',
  },
};

const text: SxProps<Theme> = {
  position: 'relative',
  gap: 2.5,
  maxWidth: 760,
  marginInline: 'auto',
  textAlign: 'center',
};

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: '#C9A567',
};

const title: SxProps<Theme> = {
  color: 'common.white',
  fontWeight: 700,
};

const paragraph: SxProps<Theme> = {
  color: 'rgba(255,255,255,0.82)',
};

const action: SxProps<Theme> = {
  marginBlockStart: 2,
  display: 'flex',
  justifyContent: 'center',
};

const Styles = { section, card, text, tagline, title, paragraph, action };

export default Styles;
