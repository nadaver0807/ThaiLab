import { type CSSProperties } from 'react';
import { type SxProps, type Theme } from '@mui/material';

const appBar: SxProps<Theme> = {
  backgroundColor: '#E5DBC9',
  borderBottom: 1,
  borderColor: 'rgba(58, 63, 39, 0.14)',
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
  color: 'text.primary',
};

const socialIcon: SxProps<Theme> = {
  color: 'secondary.main',
};

const brandLink: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
};

const brandImage: CSSProperties = {
  height: 'clamp(36px, 6vw, 52px)',
  width: 'auto',
};

const actions: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 1.5,
  flex: 1,
  display: { xs: 'none', md: 'flex' },
};

const Styles = { appBar, toolbar, side, menuIcon, socialIcon, brandLink, brandImage, actions };

export default Styles;
