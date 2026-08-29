import { type SxProps, type Theme } from '@mui/material';

const header: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 2,
  marginBlockEnd: 2,
};

const category: SxProps<Theme> = {
  marginBlockStart: 5,
};

const categoryTitle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'primary.main',
  letterSpacing: '0.06em',
  paddingBlockEnd: 1,
  borderBottom: '2px solid',
  borderColor: 'secondary.main',
};

const feedback: SxProps<Theme> = {
  marginBlockEnd: 2,
};

const Styles = { header, category, categoryTitle, feedback };

export default Styles;
