import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE } from '@theme/theme';

const notice: SxProps<Theme> = {
  position: 'fixed',
  insetInline: { xs: 12, md: 24 },
  bottom: { xs: 'calc(12px + env(safe-area-inset-bottom))', md: 24 },
  zIndex: (theme) => theme.zIndex.appBar + 2,
  maxWidth: 720,
  marginInline: 'auto',
  padding: { xs: 2, md: 3 },
  borderRadius: 2,
  borderColor: GOLD_LINE,
  boxShadow: '0 20px 50px -20px rgba(51, 58, 38, 0.55)',
};

const text: SxProps<Theme> = {
  color: 'text.primary',
};

const actions: SxProps<Theme> = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 2,
  marginBlockStart: 2,
};

const Styles = { notice, text, actions };

export default Styles;
