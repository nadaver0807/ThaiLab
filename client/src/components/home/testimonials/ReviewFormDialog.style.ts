import { type SxProps, type Theme } from '@mui/material';

const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  paddingBlockStart: 1,
};

const ratingRow: SxProps<Theme> = {
  gap: 0.5,
  marginBlockEnd: 1,
};

const ratingLabel: SxProps<Theme> = {
  color: 'text.secondary',
};

const ratingError: SxProps<Theme> = {
  color: 'error.main',
};

const Styles = { form, ratingRow, ratingLabel, ratingError };

export default Styles;
