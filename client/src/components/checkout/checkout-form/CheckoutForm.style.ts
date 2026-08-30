import { type SxProps, type Theme } from '@mui/material';

const layout: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
  gap: 3,
  alignItems: 'start',
};

const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

const block: SxProps<Theme> = {
  gap: 1,
  marginBlockEnd: 2,
};

const blockTitle: SxProps<Theme> = {
  fontWeight: 700,
};

const hint: SxProps<Theme> = {
  color: 'text.secondary',
};

const phoneRow: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'stretch', sm: 'flex-start' },
  gap: 1,
};

const lookupButton: SxProps<Theme> = {
  whiteSpace: 'nowrap',
  marginBlockStart: { xs: 0, sm: 1 },
};

const nameRow: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 1,
};

const actions: SxProps<Theme> = {
  marginBlockStart: 1,
};

const paymentNote: SxProps<Theme> = {
  color: 'text.secondary',
  marginBlockStart: 0.5,
};

const empty: SxProps<Theme> = {
  alignItems: 'center',
  gap: 2,
};

const Styles = {
  layout,
  form,
  block,
  blockTitle,
  hint,
  phoneRow,
  lookupButton,
  nameRow,
  actions,
  paymentNote,
  empty,
};

export default Styles;
