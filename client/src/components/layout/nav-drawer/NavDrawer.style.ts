import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE, OLIVE_GRADIENT } from '@theme/theme';

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
  backgroundImage: OLIVE_GRADIENT,
  borderBottom: `1px solid ${GOLD_LINE}`,
  color: 'common.white',
};

const title: SxProps<Theme> = {
  fontWeight: 700,
  color: 'secondary.light',
};

const sectionLabel: SxProps<Theme> = {
  paddingInline: 2,
  paddingBlock: 1,
  color: 'secondary.dark',
  fontWeight: 700,
  letterSpacing: '0.12em',
};

const icon: SxProps<Theme> = {
  minWidth: 40,
  color: 'primary.main',
};

const activeItem: SxProps<Theme> = {
  backgroundColor: 'rgba(74, 81, 56, 0.08)',
  borderInlineEnd: '3px solid',
  borderColor: 'secondary.main',
  '& .MuiListItemText-primary': { fontWeight: 700, color: 'primary.main' },
};

const Styles = { paper, header, title, sectionLabel, icon, activeItem };

export default Styles;
