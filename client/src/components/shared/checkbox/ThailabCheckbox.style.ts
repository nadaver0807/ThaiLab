import { type SxProps, type Theme } from '@mui/material';

const root: SxProps<Theme> = {
  width: '100%',
};

const label: SxProps<Theme> = {
  alignItems: 'flex-start',
  marginInlineStart: 0,
  '& .MuiCheckbox-root': { paddingBlockStart: 0.5 },
};

const link: SxProps<Theme> = {
  color: 'primary.main',
  fontWeight: 600,
};

const Styles = { root, label, link };

export default Styles;
