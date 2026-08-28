import { type SxProps, type Theme } from '@mui/material';

const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  width: '100%',
  maxWidth: 520,
  padding: { xs: 3, md: 4 },
  borderRadius: 2,
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
};

const title: SxProps<Theme> = {
  fontWeight: 700,
};

const actions: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const Styles = { form, title, actions };

export default Styles;
