import { type SxProps, type Theme } from '@mui/material';

const hero: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: 4, md: 7 },
  alignItems: 'center',
  paddingBlockStart: { xs: 12, md: 16 },
  paddingBlockEnd: { xs: 6, md: 10 },
};

const heroImage = (src: string): SxProps<Theme> => ({
  flexShrink: 0,
  width: { xs: '100%', md: 380 },
  height: { xs: 300, md: 460 },
  borderRadius: 2,
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid rgba(176, 141, 87, 0.5)',
  boxShadow: '0 40px 80px -40px rgba(0,0,0,0.6)',
});

const heroText: SxProps<Theme> = {
  gap: 2.5,
  textAlign: { xs: 'center', md: 'start' },
};

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'secondary.main',
};

const heroTitle: SxProps<Theme> = {
  color: 'text.primary',
  fontWeight: 700,
};

const heroSubtitle: SxProps<Theme> = {
  color: 'text.secondary',
  maxWidth: 520,
  marginInline: { xs: 'auto', md: 0 },
};

const block: SxProps<Theme> = {
  paddingBlock: { xs: 5, md: 8 },
};

const blockDark: SxProps<Theme> = {
  position: 'relative',
  backgroundColor: 'primary.dark',
  borderRadius: 2,
  padding: { xs: 4, md: 8 },
  border: '1px solid',
  borderColor: 'rgba(176, 141, 87, 0.5)',
  boxShadow: '0 40px 80px -40px rgba(0,0,0,0.7)',
};

const sectionHeading: SxProps<Theme> = {
  marginBlockEnd: 3,
  fontWeight: 700,
};

const paragraph: SxProps<Theme> = {
  marginBlockEnd: 2,
  color: 'text.primary',
};

const paragraphLight: SxProps<Theme> = {
  marginBlockEnd: 2,
  color: 'rgba(255,255,255,0.85)',
};

const headingLight: SxProps<Theme> = {
  marginBlockEnd: 3,
  fontWeight: 700,
  color: 'common.white',
};

const values: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
  gap: 3,
  marginBlockStart: 2,
};

const valueCard: SxProps<Theme> = {
  padding: { xs: 3, md: 4 },
  borderRadius: 2,
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  textAlign: 'center',
};

const valueTitle: SxProps<Theme> = {
  fontWeight: 700,
  marginBlockEnd: 1,
  color: 'secondary.main',
};

const cta: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  gap: 2,
  flexWrap: 'wrap',
  paddingBlock: { xs: 6, md: 8 },
};

const Styles = {
  hero,
  heroImage,
  heroText,
  tagline,
  heroTitle,
  heroSubtitle,
  block,
  blockDark,
  sectionHeading,
  paragraph,
  paragraphLight,
  headingLight,
  values,
  valueCard,
  valueTitle,
  cta,
};

export default Styles;
