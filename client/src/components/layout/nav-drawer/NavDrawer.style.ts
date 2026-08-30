import { type SxProps, type Theme } from '@mui/material';

const paper: SxProps<Theme> = {
  width: { xs: 260, sm: 300 },
  display: 'flex',
  flexDirection: 'column',
};

const header: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  padding: 2,
  borderBottom: '1px solid',
  borderColor: 'divider',
};

const title: SxProps<Theme> = {
  fontWeight: 700,
};

const sectionLabel: SxProps<Theme> = {
  paddingInline: 2,
  paddingBlock: 1,
  color: 'text.secondary',
  fontWeight: 700,
};

const icon: SxProps<Theme> = {
  minWidth: 40,
  color: 'primary.main',
};

const activeItem: SxProps<Theme> = {
  backgroundColor: 'rgba(74, 81, 56, 0.08)',
  '& .MuiListItemText-primary': { fontWeight: 700 },
};

const Styles = { paper, header, title, sectionLabel, icon, activeItem };

export default Styles;
