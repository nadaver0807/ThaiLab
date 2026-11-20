import { type SxProps, type Theme } from '@mui/material';

const fab: SxProps<Theme> = {
  position: 'fixed',
  insetInlineEnd: { xs: 16, md: 24 },
  bottom: { xs: 'calc(92px + env(safe-area-inset-bottom))', md: 24 },
  zIndex: (theme) => theme.zIndex.appBar + 1,
  backgroundColor: '#0B7A4B',
  color: 'common.white',
  '&:hover': { backgroundColor: '#075E54' },
};

const Styles = { fab };

export default Styles;
