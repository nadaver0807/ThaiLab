import { type SxProps, type Theme } from '@mui/material';

const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  width: '100%',
  maxWidth: 560,
  padding: { xs: 3, md: 4 },
  borderRadius: 2,
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
};

const intro: SxProps<Theme> = {
  color: 'text.secondary',
  marginBlockEnd: 1,
};

const actions: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const Styles = { form, intro, actions };

export default Styles;
