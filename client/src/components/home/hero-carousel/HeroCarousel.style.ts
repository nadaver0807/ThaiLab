import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  color: 'common.white',
};

const slide = (image: string, isActive: boolean): SxProps<Theme> => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `linear-gradient(180deg, rgba(26,26,26,0.35) 0%, rgba(26,26,26,0.55) 55%, rgba(26,26,26,0.85) 100%),
    url(${image})`,
  backgroundColor: 'primary.dark',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: isActive ? 1 : 0,
  transform: isActive ? 'scale(1.05)' : 'scale(1)',
  transition: 'opacity 1.6s ease-in-out, transform 7s ease-out',
});

const content: SxProps<Theme> = {
  position: 'relative',
  paddingBlock: { xs: 12, md: 16 },
  textAlign: 'center',
};

const brand: SxProps<Theme> = {
  fontFamily: 'var(--font-brand)',
  fontWeight: 700,
  color: 'common.white',
  fontSize: { xs: '3.2rem', md: '5rem' },
  lineHeight: 1,
  marginBlockEnd: 2,
  textShadow: '0 4px 30px rgba(0,0,0,0.5)',
};

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.34em',
  textTransform: 'uppercase',
  color: 'secondary.light',
};

const title: SxProps<Theme> = {
  marginBlockStart: 2,
  marginInline: 'auto',
  maxWidth: 900,
  color: 'common.white',
  fontWeight: 700,
  letterSpacing: '0.01em',
  textShadow: '0 6px 30px rgba(0,0,0,0.55)',
};

const subtitle: SxProps<Theme> = {
  marginBlockStart: 3,
  marginInline: 'auto',
  maxWidth: 640,
  color: 'rgba(255,255,255,0.88)',
  fontWeight: 400,
};

const actions: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
  justifyContent: 'center',
  marginBlockStart: 5,
};

const dots: SxProps<Theme> = {
  flexDirection: 'row',
  gap: 1.5,
  justifyContent: 'center',
  marginBlockStart: 6,
};

const dot = (isActive: boolean): SxProps<Theme> => ({
  width: isActive ? 32 : 10,
  height: 10,
  minWidth: 0,
  padding: 0,
  borderRadius: 999,
  backgroundColor: isActive ? 'secondary.main' : 'rgba(255,255,255,0.45)',
  transition: 'width 0.4s ease, background-color 0.4s ease',
});

const Styles = { section, slide, content, brand, tagline, title, subtitle, actions, dots, dot };

export default Styles;
