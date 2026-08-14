'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  HERO_SLIDES,
  HERO_SLIDE_INTERVAL_MS,
} from '@components/home/hero-carousel/HeroCarousel.const';

const useHeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setActiveIndex((current) => (current + 1) % HERO_SLIDES.length),
      HERO_SLIDE_INTERVAL_MS,
    );

    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = useCallback((index: number) => setActiveIndex(index), []);

  return { activeIndex, goToSlide };
};

export default useHeroCarousel;
