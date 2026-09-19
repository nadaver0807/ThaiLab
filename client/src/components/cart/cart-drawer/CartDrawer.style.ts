import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE, OLIVE_GRADIENT } from '@theme/theme';

const drawer: SxProps<Theme> = {
  zIndex: (theme) => theme.zIndex.appBar + 2,
};

const paper: SxProps<Theme> = {
  width: { xs: '100%', sm: 420 },
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '@supports (height: 100dvh)': { height: '100dvh' },
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
  flexShrink: 0,
  '& .MuiIconButton-root': { color: 'secondary.light' },
};

const title: SxProps<Theme> = {
  fontWeight: 700,
  color: 'secondary.light',
};

const items: SxProps<Theme> = {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  overscrollBehavior: 'contain',
  padding: 2,
  gap: 2,
};

const item: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1.5,
};

/** עמודת השם נמתחת, כך שהכמות והמחיר נשארים צמודים בקצה. */
const itemInfo: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

const itemName: SxProps<Theme> = {
  fontWeight: 700,
};

const itemOption: SxProps<Theme> = {
  color: 'text.secondary',
};

/** מצמיד את בורר הכמות למחיר כיחידה אחת בקצה השורה. */
const itemControls: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
  flexShrink: 0,
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
  /** תמיד נשאר גלוי בתחתית הדרואר, מעל סרגל ההזמנה. */
  flexShrink: 0,
  backgroundColor: 'background.paper',
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
  drawer,
  paper,
  header,
  title,
  items,
  item,
  itemInfo,
  itemName,
  itemOption,
  itemControls,
  itemPrice,
  footer,
  totalRow,
  totalLabel,
  empty,
  divider,
};

export default Styles;
