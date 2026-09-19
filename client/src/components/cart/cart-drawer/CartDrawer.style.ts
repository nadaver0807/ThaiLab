import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE, OLIVE_GRADIENT } from '@theme/theme';

const paper: SxProps<Theme> = {
  width: { xs: '100%', sm: 420 },
  display: 'flex',
  flexDirection: 'column',
};

const header: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  padding: 2,
  backgroundImage: OLIVE_GRADIENT,
  borderBottom: `1px solid ${GOLD_LINE}`,
  color: 'common.white',
};

const title: SxProps<Theme> = {
  fontWeight: 700,
  color: 'secondary.light',
};

const items: SxProps<Theme> = {
  flex: 1,
  overflowY: 'auto',
  padding: 2,
  gap: 2,
};

const item: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1.5,
};

const itemName: SxProps<Theme> = {
  fontWeight: 700,
};

const itemOption: SxProps<Theme> = {
  color: 'text.secondary',
};

const itemPrice: SxProps<Theme> = {
  fontWeight: 700,
  color: 'secondary.dark',
  whiteSpace: 'nowrap',
  minWidth: 56,
  textAlign: 'end',
};

const footer: SxProps<Theme> = {
  gap: 1,
  padding: 2,
  paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
  borderTop: `1px solid ${GOLD_LINE}`,
};

const totalRow: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
};

const totalLabel: SxProps<Theme> = {
  fontWeight: 700,
};

const empty: SxProps<Theme> = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 3,
  color: 'text.secondary',
  textAlign: 'center',
};

const divider: SxProps<Theme> = {
  marginBlockStart: 2,
};

const Styles = {
  paper,
  header,
  title,
  items,
  item,
  itemName,
  itemOption,
  itemPrice,
  footer,
  totalRow,
  totalLabel,
  empty,
  divider,
};

export default Styles;
