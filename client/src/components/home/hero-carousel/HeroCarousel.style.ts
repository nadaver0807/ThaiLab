import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  position: 'relative',
  minHeight: { xs: 520, md: 640 },
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  color: 'common.white',
};

const slide = (image: string, isActive: boolean): SxProps<Theme> => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `linear-gradient(180deg, rgba(26,17,12,0.35) 0%, rgba(26,17,12,0.8) 100%),
    url(${image})`,
  backgroundColor: 'text.primary',
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

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'secondary.light',
};

const title: SxProps<Theme> = {
  marginBlockStart: 2,
  color: 'common.white',
};

const subtitle: SxProps<Theme> = {
  marginBlockStart: 3,
  marginInline: 'auto',
  maxWidth: 620,
  color: 'grey.200',
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

const Styles = { section, slide, content, tagline, title, subtitle, actions, dots, dot };

export default Styles;
