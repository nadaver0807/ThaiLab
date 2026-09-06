import { type SxProps, type Theme } from '@mui/material';

const block: SxProps<Theme> = {
  gap: 1.5,
};

const blockTitle: SxProps<Theme> = {
  fontSize: '1.125rem',
};

const options: SxProps<Theme> = {
  gap: 1.5,
};

const option: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1.5,
  padding: 2,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  cursor: 'pointer',
  transition: 'border-color 0.2s, background-color 0.2s',
  '&:hover': { borderColor: 'secondary.light' },
};

const optionSelected: SxProps<Theme> = {
  ...(option as object),
  borderColor: 'secondary.main',
  backgroundColor: 'action.hover',
};

const icon: SxProps<Theme> = {
  color: 'secondary.dark',
};

const optionTitle: SxProps<Theme> = {
  fontWeight: 600,
};

const optionDescription: SxProps<Theme> = {
  color: 'text.secondary',
};

const Styles = {
  block,
  blockTitle,
  options,
  option,
  optionSelected,
  icon,
  optionTitle,
  optionDescription,
};

export default Styles;
