import { type SxProps, type Theme } from '@mui/material';

const bar: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'stretch', sm: 'center' },
  justifyContent: 'space-between',
  gap: 1.5,
  padding: 2,
  marginBlockEnd: 3,
  borderRadius: 2,
  border: '1px dashed',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

const identity: SxProps<Theme> = {
  color: 'text.secondary',
};

const email: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.primary',
};

const actions: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 1,
};

const field: SxProps<Theme> = {
  minWidth: { sm: 260 },
};

const Styles = { bar, identity, email, actions, field };

export default Styles;
