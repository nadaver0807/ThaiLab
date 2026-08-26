import { type SxProps, type Theme } from '@mui/material';

const section: SxProps<Theme> = {
  backgroundColor: 'primary.dark',
  paddingBlock: { xs: 8, md: 14 },
  textAlign: 'center',
};

const tagline: SxProps<Theme> = {
  fontWeight: 600,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'secondary.light',
};

const title: SxProps<Theme> = {
  marginBlockStart: 1,
  marginBlockEnd: 5,
  color: 'common.white',
  fontWeight: 700,
};

const grid: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
  gridAutoRows: { xs: 130, md: 180 },
  gap: 2,
  '& > *:nth-of-type(1)': { gridRow: 'span 2' },
  '& > *:nth-of-type(4)': { gridRow: 'span 2' },
  '& > *:nth-of-type(6)': { gridRow: 'span 2' },
};

const tile = (image: string): SxProps<Theme> => ({
  borderRadius: 1,
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid rgba(176,141,87,0.35)',
  boxShadow: '0 20px 40px -28px rgba(0,0,0,0.8)',
  transition: 'transform 0.4s ease, filter 0.4s ease',
  filter: 'saturate(1.05)',
  '&:hover': { transform: 'scale(1.03)', filter: 'saturate(1.15) brightness(1.05)' },
});

const Styles = { section, tagline, title, grid, tile };

export default Styles;
