import { type SxProps, type Theme } from '@mui/material';
import { type MenuLinkTone } from '@components/home/menu-links/MenuLinks.type';

const section: SxProps<Theme> = {
  backgroundColor: 'background.default',
  paddingBlock: { xs: 8, md: 14 },
  textAlign: 'center',
};

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'secondary.main',
};

const title: SxProps<Theme> = {
  marginBlockStart: 1,
  marginBlockEnd: 5,
  color: 'text.primary',
  fontWeight: 700,
};

const cards: SxProps<Theme> = {
  flexDirection: { xs: 'column', md: 'row' },
  gap: 3,
  alignItems: 'stretch',
};

const card = (tone: MenuLinkTone): SxProps<Theme> => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  textAlign: 'start',
  textDecoration: 'none',
  padding: { xs: 3.5, md: 4.5 },
  borderRadius: 2,
  backgroundColor: tone === 'dark' ? 'primary.main' : 'background.paper',
  color: tone === 'dark' ? 'common.white' : 'text.primary',
  border: '1px solid',
  borderColor: tone === 'dark' ? 'rgba(201,169,120,0.45)' : 'divider',
  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 60px -30px rgba(74, 81, 56, 0.45)',
  },
});

const cardSubtitle: SxProps<Theme> = {
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  opacity: 0.7,
};

const cardTitle: SxProps<Theme> = {
  fontWeight: 700,
};

const cardDescription: SxProps<Theme> = {
  flex: 1,
  opacity: 0.85,
};

const cardAction: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 0.5,
  marginBlockStart: 2,
  color: 'secondary.main',
};

const Styles = {
  section,
  tagline,
  title,
  cards,
  card,
  cardSubtitle,
  cardTitle,
  cardDescription,
  cardAction,
};

export default Styles;
