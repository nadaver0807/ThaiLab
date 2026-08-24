import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  color: 'text.primary',
};

const slide = (image: string, isActive: boolean): SxProps<Theme> => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `linear-gradient(180deg, rgba(224,247,250,0.35) 0%, rgba(139,195,74,0.35) 100%),
    url(${image})`,
  backgroundColor: 'primary.light',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: isActive ? 1 : 0,
  transition: 'opacity 1.6s ease-in-out',
});

const content: SxProps<Theme> = {
  position: 'relative',
  paddingBlock: { xs: 10, md: 14 },
  textAlign: 'center',
};

const brand: SxProps<Theme> = {
  fontFamily: 'var(--font-brand)',
  fontWeight: 700,
  color: 'text.primary',
  fontSize: { xs: '3.2rem', md: '5rem' },
  lineHeight: 1,
  marginBlockEnd: 2,
  textShadow: '0 3px 16px rgba(255,255,255,0.5)',
};

const tagline: SxProps<Theme> = {
  fontWeight: 700,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'text.primary',
};

const title: SxProps<Theme> = {
  marginBlockStart: 2,
  color: 'text.primary',
  fontWeight: 800,
  WebkitTextStroke: '1px rgba(10,10,10,0.85)',
  textShadow: '0 2px 12px rgba(255,255,255,0.45)',
};

const subtitle: SxProps<Theme> = {
  marginBlockStart: 3,
  marginInline: 'auto',
  maxWidth: 620,
  color: 'text.primary',
  fontWeight: 500,
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
  backgroundColor: isActive ? 'primary.main' : 'rgba(255,255,255,0.5)',
  transition: 'width 0.4s ease, background-color 0.4s ease',
});

const Styles = { section, slide, content, brand, tagline, title, subtitle, actions, dots, dot };

export default Styles;
