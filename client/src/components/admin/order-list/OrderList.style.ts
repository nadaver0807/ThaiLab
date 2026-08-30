import { type SxProps, type Theme } from '@mui/material';

const list: SxProps<Theme> = {
  gap: 2,
};

const card: SxProps<Theme> = {
  gap: 1,
  padding: 2,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

const header: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'flex-start', sm: 'center' },
  justifyContent: 'space-between',
  gap: 1,
};

const contact: SxProps<Theme> = {
  fontWeight: 700,
};

const meta: SxProps<Theme> = {
  color: 'text.secondary',
};

const chips: SxProps<Theme> = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 0.75,
};

const items: SxProps<Theme> = {
  gap: 0.25,
  marginBlockStart: 0.5,
};

const total: SxProps<Theme> = {
  fontWeight: 700,
  whiteSpace: 'nowrap',
};

const statusSelect: SxProps<Theme> = {
  minWidth: 160,
};

const Styles = { list, card, header, contact, meta, chips, items, total, statusSelect };

export default Styles;
