import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: { xs: 8, md: 12 },
  backgroundColor: 'background.paper',
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

const grid: SxProps<Theme> = {
  display: 'grid',
  gap: { xs: 3, md: 4 },
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  alignItems: 'stretch',
};

const card: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  height: '100%',
  padding: 3,
  borderRadius: 2,
};

const quoteIcon: SxProps<Theme> = {
  color: 'secondary.main',
  fontSize: 32,
};

const quote: SxProps<Theme> = {
  flexGrow: 1,
  color: 'text.primary',
};

const author: SxProps<Theme> = {
  fontWeight: 600,
};

const context: SxProps<Theme> = {
  color: 'text.secondary',
};

const action: SxProps<Theme> = {
  marginBlockStart: { xs: 4, md: 6 },
  textAlign: 'center',
};

/** כפתור "עוד ביקורות" צמוד יותר לרשת, כדי שיקרא כהמשך שלה. */
const showMore: SxProps<Theme> = {
  marginBlockStart: { xs: 2, md: 3 },
  textAlign: 'center',
};

const pendingChip: SxProps<Theme> = {
  alignSelf: 'flex-start',
};

const Styles = {
  section,
  intro,
  tagline,
  title,
  grid,
  card,
  quoteIcon,
  quote,
  author,
  context,
  action,
  showMore,
  pendingChip,
};

export default Styles;
