import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  paddingBlock: { xs: 8, md: 12 },
};

const layout: SxProps<Theme> = {
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: 4, md: 8 },
  alignItems: 'center',
};

const image: SxProps<Theme> = {
  flex: 1,
  width: '100%',
  minHeight: { xs: 280, md: 420 },
  borderRadius: 3,
  backgroundImage: 'url(/images/chef-portrait.jpg)',
  backgroundColor: 'background.paper',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const text: SxProps<Theme> = {
  flex: 1,
  gap: 2,
};

const tagline: SxProps<Theme> = {
  color: 'primary.main',
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
};

const paragraph: SxProps<Theme> = {
  color: 'text.secondary',
};

const action: SxProps<Theme> = {
  marginBlockStart: 2,
  alignSelf: 'flex-start',
};

const Styles = { section, layout, image, text, tagline, paragraph, action };

export default Styles;
