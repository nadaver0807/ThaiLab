import { type SxProps, type Theme } from '@mui/material';

const layout: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const main: SxProps<Theme> = {
  flex: 1,
  paddingBottom: { xs: 11, md: 0 },
};

const Styles = { layout, main };

export default Styles;
