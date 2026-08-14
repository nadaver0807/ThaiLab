import { type HeroSlide } from '@components/home/hero-carousel/HeroCarousel.type';

export const HERO_SLIDE_INTERVAL_MS = 6000;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'curry',
    image: '/images/hero-curry.jpg',
    title: 'מטבח תאילנדי אישי',
    subtitle: 'כל מנה נבנית ביד אחת, מחומרי גלם טריים ומתבלינים שנטחנים במקום.',
  },
  {
    id: 'chef',
    image: '/images/hero-chef.jpg',
    title: 'השף על האש',
    subtitle: 'ווק לוהט, אש גבוהה וטעמים שמגיעים ישר מהשווקים של בנגקוק.',
  },
  {
    id: 'table',
    image: '/images/hero-table.jpg',
    title: 'שולחן שמחכה לכם',
    subtitle: 'משלוח, איסוף עצמי או ארוחת שף פרטית — אתם בוחרים את החוויה.',
  },
];
