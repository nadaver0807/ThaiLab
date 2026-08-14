import { type FC } from 'react';
import { Box } from '@mui/material';
import HeroCarousel from '@components/home/hero-carousel/HeroCarousel';
import OrderCategories from '@components/home/order-categories/OrderCategories';
import ChefStory from '@components/home/chef-story/ChefStory';
import ReviewsSection from '@components/home/reviews-section/ReviewsSection';
import OrderCta from '@components/home/order-cta/OrderCta';
import Styles from '@components/home/home-page/HomePage.style';

const HomePage: FC = () => (
  <Box sx={Styles.page}>
    <HeroCarousel />

    <OrderCategories />

    <ChefStory />

    <ReviewsSection />

    <OrderCta />
  </Box>
);

export default HomePage;
