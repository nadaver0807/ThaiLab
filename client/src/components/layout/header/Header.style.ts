import { type SxProps, type Theme } from '@mui/material';

const appBar: SxProps<Theme> = {
  backgroundColor: '#FFFDF5',
  borderBottom: 1,
  borderColor: 'divider',
};

const toolbar: SxProps<Theme> = {
  justifyContent: 'space-between',
  gap: 2,
  paddingInline: '0 !important',
  minHeight: { xs: 64, md: 76 },
};

const side: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 0.5,
  flex: 1,
};

const menuIcon: SxProps<Theme> = {
  color: 'secondary.dark',
};

const socialIcon: SxProps<Theme> = {
  color: 'text.primary',
};

const brand: SxProps<Theme> = {
  color: 'text.primary',
  textDecoration: 'none',
  fontFamily: 'var(--font-brand)',
  fontWeight: 700,
  fontSize: { xs: '1.7rem', md: '2.2rem' },
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const actions: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 1.5,
  flex: 1,
  display: { xs: 'none', md: 'flex' },
};

const Styles = { appBar, toolbar, side, menuIcon, socialIcon, brand, actions };

export default Styles;
