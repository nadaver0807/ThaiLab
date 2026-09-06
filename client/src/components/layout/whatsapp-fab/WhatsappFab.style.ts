import { type SxProps, type Theme } from '@mui/material';

const fab: SxProps<Theme> = {
  position: 'fixed',
  insetInlineEnd: { xs: 16, md: 24 },
  bottom: { xs: 'calc(92px + env(safe-area-inset-bottom))', md: 24 },
  zIndex: (theme) => theme.zIndex.appBar + 1,
  backgroundColor: '#25D366',
  color: 'common.white',
  '&:hover': { backgroundColor: '#1DA851' },
};

const Styles = { fab };

export default Styles;
