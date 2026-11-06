import { type SxProps, type Theme } from '@mui/material';

const panel: SxProps<Theme> = {
  gap: 2,
  width: '100%',
  maxWidth: 420,
  padding: { xs: 3, md: 4 },
  borderRadius: 2,
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
};

const title: SxProps<Theme> = {
  fontWeight: 700,
};

const identity: SxProps<Theme> = {
  color: 'text.secondary',
};

const email: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.primary',
};

const actions: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 1.5,
  marginBlockStart: 1,
  '& .MuiButton-root': {
    justifyContent: 'flex-start',
    minHeight: 48,
    whiteSpace: 'nowrap',
  },
};

const Styles = { panel, title, identity, email, actions };

export default Styles;
