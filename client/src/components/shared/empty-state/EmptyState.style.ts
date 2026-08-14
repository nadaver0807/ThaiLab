import { type SxProps, type Theme } from '@mui/material';

const wrapper: SxProps<Theme> = {
  alignItems: 'center',
  gap: 1,
  paddingBlock: 8,
  textAlign: 'center',
};

const description: SxProps<Theme> = {
  color: 'text.secondary',
};

const Styles = { wrapper, description };

export default Styles;
