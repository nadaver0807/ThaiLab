import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: { xs: 8, md: 10 },
  backgroundColor: 'background.paper',
};

const title: SxProps<Theme> = {
  textAlign: 'center',
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
  gap: 2,
  padding: 4,
  borderRadius: 3,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.default',
};

const content: SxProps<Theme> = {
  flexGrow: 1,
  color: 'text.secondary',
};

const author: SxProps<Theme> = {
  fontWeight: 600,
};

const Styles = { section, title, cards, card, content, author };

export default Styles;
