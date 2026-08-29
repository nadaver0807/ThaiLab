import { type SxProps, type Theme } from '@mui/material';

const content: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  paddingBlockStart: 1,
};

const row: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
};

const switches: SxProps<Theme> = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 2,
};

const Styles = { content, row, switches };

export default Styles;
