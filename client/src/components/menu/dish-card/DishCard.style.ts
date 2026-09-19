import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE } from '@theme/theme';

const card: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  paddingBlock: 2.5,
  borderBottom: `1px solid ${GOLD_LINE}`,
};

const header: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 2,
};

const name: SxProps<Theme> = {
  fontWeight: 700,
  color: 'primary.main',
};

const prices: SxProps<Theme> = {
  gap: 1,
  marginBlockStart: 0.5,
};

const description: SxProps<Theme> = {
  color: 'text.secondary',
};

const notes: SxProps<Theme> = {
  color: 'text.secondary',
  fontStyle: 'italic',
};

const tags: SxProps<Theme> = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 0.75,
  marginBlockStart: 0.5,
};

const adminActions: SxProps<Theme> = {
  flexDirection: 'row',
  gap: 1,
  marginBlockStart: 1,
};

const Styles = {
  card,
  header,
  name,
  prices,
  description,
  notes,
  tags,
  adminActions,
};

export default Styles;
