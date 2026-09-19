import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE, OLIVE_GRADIENT } from '@theme/theme';

const footer: SxProps<Theme> = {
  backgroundImage: OLIVE_GRADIENT,
  borderTop: `2px solid ${GOLD_LINE}`,
  marginBlockStart: 'auto',
  color: 'common.white',
  /** לא מתכווץ, ומפנה מקום ל-safe-area ולסרגל ההזמנה הקבוע במובייל. */
  flexShrink: 0,
  paddingBottom: {
    xs: 'calc(72px + env(safe-area-inset-bottom))',
    md: 'env(safe-area-inset-bottom)',
  },
};

const grid: SxProps<Theme> = {
  display: 'grid',
  gap: 4,
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(5, 1fr)',
  },
  paddingBlock: 8,
};

const brand: SxProps<Theme> = {
  fontFamily: 'var(--font-brand)',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'common.white',
};

const tagline: SxProps<Theme> = {
  marginBlockStart: 1,
  color: 'warning.main',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

const columnTitle: SxProps<Theme> = {
  fontWeight: 700,
  marginBlockEnd: 1,
  color: 'secondary.light',
  letterSpacing: '0.04em',
};

const nav: SxProps<Theme> = {
  gap: 1,
};

const navLink: SxProps<Theme> = {
  color: 'rgba(255,255,255,0.82)',
  textDecoration: 'none',
  '&:hover': { color: 'warning.main' },
};

const hours: SxProps<Theme> = {
  gap: 0.5,
  color: 'rgba(255,255,255,0.82)',
};

const contact: SxProps<Theme> = {
  gap: 0.5,
  color: 'rgba(255,255,255,0.82)',
};

const orderCta: SxProps<Theme> = {
  marginBlockStart: 2,
};

const copyright: SxProps<Theme> = {
  borderTop: `1px solid ${GOLD_LINE}`,
  paddingBlock: 2,
  textAlign: 'center',
  color: 'rgba(255,255,255,0.7)',
};

const socialLink: SxProps<Theme> = {
  color: 'warning.main',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
};

const Styles = {
  footer,
  grid,
  tagline,
  columnTitle,
  nav,
  navLink,
  hours,
  contact,
  brand,
  orderCta,
  copyright,
  socialLink,
};

export default Styles;
