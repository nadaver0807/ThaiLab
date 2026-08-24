import { type HeroSlide } from '@components/home/hero-carousel/HeroCarousel.type';

export const HERO_SLIDE_INTERVAL_MS = 6000;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'interior',
    image: '/images/hero-curry.jpg',
    title: 'ברוכים הבאים ל-ThaiLab',
    subtitle: 'מטבח אישי ואותנטי, שבו כל ארוחה מרגישה כמו חופשה קטנה בתאילנד.',
  },
  {
    id: 'food',
    image: '/images/hero-chef.jpg',
    title: 'ברוכים הבאים ל-ThaiLab',
    subtitle: 'מנות תוססות וצבעוניות, מחומרי גלם טריים ותבלינים שנטחנים במקום.',
  },
  {
    id: 'table',
    image: '/images/hero-table.jpg',
    title: 'ברוכים הבאים ל-ThaiLab',
    subtitle: 'משלוח, איסוף עצמי או שולחן שמור — אתם בוחרים את החוויה.',
  },
];
