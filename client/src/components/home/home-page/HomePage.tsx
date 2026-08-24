import { type FC } from 'react';
import { Box } from '@mui/material';
import HeroCarousel from '@components/home/hero-carousel/HeroCarousel';
import AboutAtmosphere from '@components/home/about-atmosphere/AboutAtmosphere';
import MenuLinks from '@components/home/menu-links/MenuLinks';
import GallerySection from '@components/home/gallery-section/GallerySection';
import Styles from '@components/home/home-page/HomePage.style';

const HomePage: FC = () => (
  <Box sx={Styles.page}>
    <HeroCarousel />
    <AboutAtmosphere />
    <MenuLinks />
    <GallerySection />
  </Box>
);

export default HomePage;
