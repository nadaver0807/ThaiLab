import { type SxProps, type Theme } from '@mui/material';

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
});

const text: SxProps<Theme> = {
  gap: 2,
};

const paragraph: SxProps<Theme> = {
  color: 'text.secondary',
};

const detailsTitle: SxProps<Theme> = {
  marginBlockStart: 2,
  fontWeight: 600,
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
