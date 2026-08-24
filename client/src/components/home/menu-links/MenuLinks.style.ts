import { type SxProps, type Theme } from '@mui/material';
import { type MenuLinkTone } from '@components/home/menu-links/MenuLinks.type';

const section: SxProps<Theme> = {
  backgroundColor: 'primary.main',
  paddingBlock: { xs: 8, md: 12 },
  textAlign: 'center',
};

const tagline: SxProps<Theme> = {
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'text.primary',
};

const title: SxProps<Theme> = {
  marginBlockStart: 1,
  marginBlockEnd: 5,
  color: 'text.primary',
  fontWeight: 800,
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
  padding: { xs: 3, md: 4 },
  borderRadius: 3,
  backgroundColor: tone === 'green' ? 'secondary.dark' : '#FFFDF5',
  color: tone === 'green' ? 'common.white' : 'text.primary',
  border: '1px solid',
  borderColor: tone === 'green' ? 'secondary.dark' : 'divider',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 22px 44px -24px rgba(0,0,0,0.45)',
  },
});

const cardSubtitle: SxProps<Theme> = {
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  opacity: 0.85,
};

const cardTitle: SxProps<Theme> = {
  fontWeight: 800,
};

const cardDescription: SxProps<Theme> = {
  flex: 1,
};

const cardAction: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 0.5,
  marginBlockStart: 2,
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
