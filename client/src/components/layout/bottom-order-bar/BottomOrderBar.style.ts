import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE, OLIVE_GRADIENT } from '@theme/theme';

const bar: SxProps<Theme> = {
  display: { xs: 'flex', md: 'none' },
  position: 'fixed',
  insetInline: 0,
  bottom: 0,
  zIndex: (theme) => theme.zIndex.appBar,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  paddingInline: 2,
  paddingBlock: 1.5,
  paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
  borderTop: `1px solid ${GOLD_LINE}`,
  backgroundImage: OLIVE_GRADIENT,
  boxShadow: '0 -8px 24px rgba(51, 58, 38, 0.28)',
};

const summary: SxProps<Theme> = {
  alignItems: 'flex-start',
  textAlign: 'start',
};

const summaryButton: SxProps<Theme> = {
  ...summary,
  appearance: 'none',
  background: 'none',
  border: 0,
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  borderRadius: 1,
  '&:focus-visible': { outline: '2px solid', outlineColor: 'secondary.light' },
};

const label: SxProps<Theme> = {
  fontWeight: 700,
  color: 'secondary.light',
};

const hint: SxProps<Theme> = {
  color: 'rgba(255, 255, 255, 0.75)',
};

const Styles = { bar, summary, summaryButton, label, hint };

export default Styles;
