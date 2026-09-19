import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE, OLIVE_GRADIENT } from '@theme/theme';

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
  color: 'secondary.light',
  letterSpacing: '0.06em',
  backgroundImage: OLIVE_GRADIENT,
  border: `1px solid ${GOLD_LINE}`,
  borderRadius: 2,
  paddingInline: { xs: 2, md: 3 },
  paddingBlock: 1.5,
};

const feedback: SxProps<Theme> = {
  marginBlockEnd: 2,
};

const Styles = { header, category, categoryTitle, feedback };

export default Styles;
