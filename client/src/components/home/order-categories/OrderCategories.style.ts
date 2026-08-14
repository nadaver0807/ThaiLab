import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: { xs: 8, md: 12 },
  backgroundColor: 'background.default',
};

const tagline: SxProps<Theme> = {
  textAlign: 'center',
  color: 'primary.main',
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
};

const title: SxProps<Theme> = {
  marginBlockStart: 1.5,
  textAlign: 'center',
};

const description: SxProps<Theme> = {
  marginBlockStart: 2,
  marginInline: 'auto',
  maxWidth: 620,
  textAlign: 'center',
  color: 'text.secondary',
};

const cards: SxProps<Theme> = {
  flexDirection: { xs: 'column', md: 'row' },
  gap: 3,
  marginBlockStart: 6,
};

const card: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 3,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 18px 40px rgba(43, 29, 20, 0.12)',
  },
};

const cardImage = (image: string): SxProps<Theme> => ({
  height: 200,
  backgroundImage: `linear-gradient(180deg, rgba(43,29,20,0) 45%, rgba(43,29,20,0.55) 100%),
    url(${image})`,
  backgroundColor: 'divider',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const cardBody: SxProps<Theme> = {
  flexGrow: 1,
  gap: 1,
  padding: 3.5,
};

const cardSubtitle: SxProps<Theme> = {
  color: 'secondary.dark',
  fontWeight: 600,
};

const cardDescription: SxProps<Theme> = {
  flexGrow: 1,
  color: 'text.secondary',
};

const cardAction: SxProps<Theme> = {
  marginBlockStart: 2,
  alignSelf: 'flex-start',
};

const Styles = {
  section,
  tagline,
  title,
  description,
  cards,
  card,
  cardImage,
  cardBody,
  cardSubtitle,
  cardDescription,
  cardAction,
};

export default Styles;
