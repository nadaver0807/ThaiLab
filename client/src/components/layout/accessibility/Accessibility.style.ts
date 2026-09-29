import { type SxProps, type Theme } from '@mui/material';

const fab: SxProps<Theme> = {
  position: 'fixed',
  insetInlineStart: { xs: 16, md: 24 },
  bottom: { xs: 'calc(92px + env(safe-area-inset-bottom))', md: 24 },
  zIndex: (theme) => theme.zIndex.appBar + 1,
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
  '&:hover': { backgroundColor: 'primary.dark' },
};

const paper: SxProps<Theme> = {
  width: { xs: '100%', sm: 360 },
  padding: 2,
};

const header: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 1,
};

const sectionLabel: SxProps<Theme> = {
  marginTop: 2,
  marginBottom: 1,
  color: 'text.secondary',
  fontWeight: 600,
};

const fontRow: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1,
};

const fontValue: SxProps<Theme> = {
  minWidth: 64,
  textAlign: 'center',
  fontWeight: 600,
};

const optionsGrid: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 1,
};

const optionButton: SxProps<Theme> = {
  flexDirection: 'column',
  gap: 0.5,
  paddingBlock: 1.5,
  paddingInline: 1,
  borderRadius: 2,
  textAlign: 'center',
  lineHeight: 1.3,
};

const footer: SxProps<Theme> = {
  marginTop: 3,
  gap: 1,
};

const skipLink: SxProps<Theme> = {
  position: 'fixed',
  insetInlineStart: 16,
  top: -200,
  zIndex: (theme) => theme.zIndex.modal + 10,
  paddingInline: 3,
  paddingBlock: 1.5,
  borderRadius: 2,
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
  fontWeight: 600,
  textDecoration: 'none',
  '&:focus-visible': { top: 16 },
};

const Styles = {
  fab,
  paper,
  header,
  sectionLabel,
  fontRow,
  fontValue,
  optionsGrid,
  optionButton,
  footer,
  skipLink,
};

export default Styles;
