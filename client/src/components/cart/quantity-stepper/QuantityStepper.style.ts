import { type SxProps, type Theme } from '@mui/material';

const stepper: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 0.5,
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 999,
  paddingInline: 0.5,
};

const button: SxProps<Theme> = {
  color: 'secondary.dark',
};

const quantity: SxProps<Theme> = {
  minWidth: 24,
  textAlign: 'center',
  fontWeight: 700,
};

const Styles = { stepper, button, quantity };

export default Styles;
