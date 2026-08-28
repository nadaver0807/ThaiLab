'use client';

import { useMemo, type FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import OrderButton from '@components/shared/order-button/OrderButton';
import Styles from '@components/home/hero-carousel/HeroCarousel.style';
import { HERO_SLIDES } from '@components/home/hero-carousel/HeroCarousel.const';
import useHeroCarousel from '@components/home/hero-carousel/useHeroCarousel';
import { SITE } from '@shared/consts/site.const';
import { Route } from '@shared/enums/route.enum';

const HeroCarousel: FC = () => {
  const { activeIndex, goToSlide } = useHeroCarousel();
  const activeSlide = useMemo(() => HERO_SLIDES[activeIndex], [activeIndex]);

  return (
    <Box component="section" sx={Styles.section}>
      {HERO_SLIDES.map((slide, index) => (
        <Box key={slide.id} sx={Styles.slide(slide.image, index === activeIndex)} />
      ))}
      <PageContainer>
        <Box sx={Styles.content}>
          <Typography variant="h2" component="p" sx={Styles.brand}>
            {SITE.name}
          </Typography>
          <Typography variant="body2" sx={Styles.tagline}>
            Private Thai Chef
          </Typography>
          <Typography variant="h1" component="h1" sx={Styles.title}>
            {activeSlide.title}
          </Typography>
          <Typography variant="subtitle1" sx={Styles.subtitle}>
            {activeSlide.subtitle}
          </Typography>
          <Stack sx={Styles.actions}>
            <OrderButton size="large" />
            <LinkButton href={Route.Contact} variant="outlined" size="large">
              הזמנת אירוע פרטי
            </LinkButton>
          </Stack>
          <Stack sx={Styles.dots}>
            {HERO_SLIDES.map((slide, index) => (
              <Button
                key={slide.id}
                aria-label={slide.title}
                onClick={() => goToSlide(index)}
                sx={Styles.dot(index === activeIndex)}
              />
            ))}
          </Stack>
        </Box>
      </PageContainer>
    </Box>
  );
};

export default HeroCarousel;
