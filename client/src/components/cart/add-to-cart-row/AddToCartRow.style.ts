import { type SxProps, type Theme } from '@mui/material';

const wrapper: SxProps<Theme> = {
  gap: 1,
};

const notes: SxProps<Theme> = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 0.75,
};

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
  fontWeight: 600,
  color: 'text.primary',
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

const Styles = { wrapper, notes, row, priceGroup, option, price, addButton };

export default Styles;
