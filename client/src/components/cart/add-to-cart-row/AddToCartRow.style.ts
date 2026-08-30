import { type SxProps, type Theme } from '@mui/material';

const row: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1.5,
};

const priceGroup: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: 1,
};

const option: SxProps<Theme> = {
  color: 'text.secondary',
};

const price: SxProps<Theme> = {
  fontWeight: 700,
  color: 'secondary.dark',
  whiteSpace: 'nowrap',
};

const addButton: SxProps<Theme> = {
  borderRadius: 999,
  whiteSpace: 'nowrap',
};

const Styles = { row, priceGroup, option, price, addButton };

export default Styles;
