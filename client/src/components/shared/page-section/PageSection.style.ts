import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE, OLIVE_GRADIENT, SAND_TINT } from '@theme/theme';

const section: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

/** רצועת פתיחה ירוקה עם טיפוגרפיית זהב — שוברת את הלבן בראש הדף. */
const hero: SxProps<Theme> = {
  position: 'relative',
  backgroundImage: OLIVE_GRADIENT,
  borderBlockEnd: `1px solid ${GOLD_LINE}`,
  paddingBlockStart: { xs: 12, md: 16 },
  paddingBlockEnd: { xs: 6, md: 8 },
  textAlign: 'center',
  color: 'common.white',
};

const heroTitle: SxProps<Theme> = {
  color: 'secondary.light',
};

const heroDescription: SxProps<Theme> = {
  marginBlockStart: 2,
  color: 'rgba(255, 255, 255, 0.82)',
};

/** גוף הדף על גוון קרם חם במקום לבן מלא. */
const body: SxProps<Theme> = {
  backgroundColor: SAND_TINT,
  paddingBlock: { xs: 6, md: 9 },
};

const description: SxProps<Theme> = {
  marginBlockStart: 2,
  color: 'text.secondary',
};

const content: SxProps<Theme> = {
  marginBlockStart: 5,
};

const Styles = { section, hero, heroTitle, heroDescription, body, description, content };

export default Styles;
