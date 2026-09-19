import { type CSSProperties } from 'react';
import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE } from '@theme/theme';

const appBar: SxProps<Theme> = {
  backgroundColor: '#F2ECDF',
  borderBottom: `2px solid ${GOLD_LINE}`,
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
  color: 'primary.main',
  '&:hover': { backgroundColor: 'rgba(74, 81, 56, 0.08)' },
};

const socialIcon: SxProps<Theme> = {
  color: 'primary.main',
  '&:hover': { color: 'secondary.dark', backgroundColor: 'rgba(74, 81, 56, 0.08)' },
};

const brandLink: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
};

const brandImage: CSSProperties = {
  height: 'clamp(34px, 5.5vw, 48px)',
  width: 'auto',
  objectFit: 'contain',
};

const mobileCart: SxProps<Theme> = {
  display: { xs: 'inline-flex', md: 'none' },
};

const actions: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 1.5,
  flex: 1,
  display: { xs: 'none', md: 'flex' },
};

const Styles = {
  appBar,
  toolbar,
  side,
  menuIcon,
  socialIcon,
  brandLink,
  brandImage,
  mobileCart,
  actions,
};

export default Styles;
