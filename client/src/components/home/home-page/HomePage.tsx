import { type FC } from 'react';
import { Box } from '@mui/material';
import HeroCarousel from '@components/home/hero-carousel/HeroCarousel';
import ServiceOptions from '@components/home/service-options/ServiceOptions';
import AboutAtmosphere from '@components/home/about-atmosphere/AboutAtmosphere';
import GallerySection from '@components/home/gallery-section/GallerySection';
import Testimonials from '@components/home/testimonials/Testimonials';
import Styles from '@components/home/home-page/HomePage.style';

const HomePage: FC = () => (
  <Box sx={Styles.page}>
    <HeroCarousel />
    <ServiceOptions />
    <AboutAtmosphere />
    <GallerySection />
    <Testimonials />
  </Box>
);

export default HomePage;
