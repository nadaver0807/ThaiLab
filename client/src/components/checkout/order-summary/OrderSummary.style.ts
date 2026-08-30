import { type SxProps, type Theme } from '@mui/material';

const panel: SxProps<Theme> = {
  gap: 1.5,
  padding: 2.5,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

const title: SxProps<Theme> = {
  fontWeight: 700,
};

const row: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 1.5,
};

const itemName: SxProps<Theme> = {
  fontWeight: 600,
};

const itemOption: SxProps<Theme> = {
  color: 'text.secondary',
};

const amount: SxProps<Theme> = {
  whiteSpace: 'nowrap',
  fontWeight: 600,
};

const totalRow: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
};

const totalLabel: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.1rem',
};

const Styles = { panel, title, row, itemName, itemOption, amount, totalRow, totalLabel };

export default Styles;
