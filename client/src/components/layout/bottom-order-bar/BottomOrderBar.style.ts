import { type SxProps, type Theme } from '@mui/material';

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
  borderTop: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  boxShadow: '0 -8px 24px rgba(74, 81, 56, 0.14)',
};

const label: SxProps<Theme> = {
  fontWeight: 700,
};

const hint: SxProps<Theme> = {
  color: 'text.secondary',
};

const Styles = { bar, label, hint };

export default Styles;
