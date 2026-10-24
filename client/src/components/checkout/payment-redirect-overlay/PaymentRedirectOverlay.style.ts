import { type SxProps, type Theme } from '@mui/material';

const backdrop: SxProps<Theme> = {
  zIndex: (theme) => theme.zIndex.modal + 1,
  color: 'common.white',
  backgroundColor: 'rgba(0, 0, 0, 0.72)',
};

const panel: SxProps<Theme> = {
  alignItems: 'center',
  textAlign: 'center',
  gap: 2,
  maxWidth: 420,
  paddingInline: 3,
};

const title: SxProps<Theme> = {
  fontWeight: 700,
  color: 'common.white',
};

const note: SxProps<Theme> = {
  color: 'grey.300',
};

const Styles = { backdrop, panel, title, note };

export default Styles;
