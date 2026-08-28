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
  boxShadow: '0 40px 80px -40px rgba(74, 81, 56, 0.45)',
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
  flex: 1,
  textAlign: { xs: 'center', md: 'start' },
};

const layout: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: 4, md: 6 },
  alignItems: 'center',
};

const image = (src: string): SxProps<Theme> => ({
  flexShrink: 0,
  width: { xs: '100%', md: 300 },
  height: { xs: 260, md: 360 },
  borderRadius: 1,
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid rgba(176, 141, 87, 0.5)',
  boxShadow: '0 24px 50px -30px rgba(74, 81, 56, 0.45)',
});

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'warning.main',
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
  justifyContent: { xs: 'center', md: 'flex-start' },
};

const Styles = { section, card, layout, image, text, tagline, title, paragraph, action };

export default Styles;
