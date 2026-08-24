import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  backgroundColor: 'background.default',
  paddingBlock: { xs: 8, md: 12 },
  textAlign: 'center',
};

const tagline: SxProps<Theme> = {
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'text.primary',
};

const title: SxProps<Theme> = {
  marginBlockStart: 1,
  marginBlockEnd: 5,
  color: 'text.primary',
  fontWeight: 800,
};

const grid: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
  gap: 2,
};

const tile = (image: string): SxProps<Theme> => ({
  aspectRatio: '4 / 3',
  borderRadius: 3,
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '4px solid',
  borderColor: 'common.white',
  boxShadow: '0 16px 36px -24px rgba(85,107,47,0.55)',
  transition: 'transform 0.35s ease',
  '&:hover': { transform: 'scale(1.03)' },
});

const Styles = { section, tagline, title, grid, tile };

export default Styles;
