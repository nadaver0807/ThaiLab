import { type SxProps, type Theme } from '@mui/material';
import { GOLD_LINE } from '@theme/theme';

const layout: SxProps<Theme> = {
  display: 'grid',
  gap: { xs: 4, md: 6 },
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  alignItems: 'start',
};

const image = (url: string): SxProps<Theme> => ({
  minHeight: { xs: 240, md: 420 },
  borderRadius: 2,
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: `1px solid ${GOLD_LINE}`,
  boxShadow: '0 30px 60px -35px rgba(74, 81, 56, 0.5)',
});

const text: SxProps<Theme> = {
  gap: 2,
  backgroundColor: 'background.paper',
  borderRadius: 2,
  border: `1px solid ${GOLD_LINE}`,
  padding: { xs: 3, md: 4 },
};

const paragraph: SxProps<Theme> = {
  color: 'text.secondary',
};

const detailsTitle: SxProps<Theme> = {
  marginBlockStart: 2,
  fontWeight: 600,
  color: 'primary.main',
};

const detailRow: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 1.5,
};

const detailIcon: SxProps<Theme> = {
  marginBlockStart: 0.25,
  fontSize: 20,
  color: 'secondary.main',
};

const detailLabel: SxProps<Theme> = {
  fontWeight: 600,
};

const actions: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
  marginBlockStart: 3,
};

const whatsappButton: SxProps<Theme> = {
  backgroundColor: '#25D366',
  color: 'common.white',
  '&:hover': { backgroundColor: '#1DA851' },
};

const Styles = {
  layout,
  image,
  text,
  paragraph,
  detailsTitle,
  detailRow,
  detailIcon,
  detailLabel,
  actions,
  whatsappButton,
};

export default Styles;
