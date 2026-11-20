'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  HERO_SLIDES,
  HERO_SLIDE_INTERVAL_MS,
} from '@components/home/hero-carousel/HeroCarousel.const';

const useHeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // WCAG 2.2.2: תוכן שזז אוטומטית מעל 5 שניות חייב אפשרות עצירה
    if (isPaused) {
      return undefined;
    }

    const intervalId = setInterval(
      () => setActiveIndex((current) => (current + 1) % HERO_SLIDES.length),
      HERO_SLIDE_INTERVAL_MS,
    );

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const goToSlide = useCallback((index: number) => setActiveIndex(index), []);
  const togglePause = useCallback(() => setIsPaused((current) => !current), []);

  return { activeIndex, goToSlide, isPaused, togglePause };
};

export default useHeroCarousel;
