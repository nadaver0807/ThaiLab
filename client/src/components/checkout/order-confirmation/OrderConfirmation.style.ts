import { type SxProps, type Theme } from '@mui/material';

const panel: SxProps<Theme> = {
  gap: 2,
  alignItems: 'center',
  textAlign: 'center',
  padding: 4,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

const icon: SxProps<Theme> = {
  fontSize: 64,
  color: 'success.main',
};

const title: SxProps<Theme> = {
  fontWeight: 700,
};

const reference: SxProps<Theme> = {
  color: 'text.secondary',
  fontFamily: 'monospace',
};

const note: SxProps<Theme> = {
  color: 'text.secondary',
  maxWidth: 460,
};

const Styles = { panel, icon, title, reference, note };

export default Styles;
