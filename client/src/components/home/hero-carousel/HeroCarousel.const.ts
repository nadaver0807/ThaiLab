import { type HeroSlide } from '@components/home/hero-carousel/HeroCarousel.type';

export const HERO_SLIDE_INTERVAL_MS = 6000;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'interior',
    image: '/images/carousel-scallops.jpeg',
    title: 'האמנות המושלמת של המטבח התאילנדי המודרני',
    subtitle: 'שף פרטי, חומרי גלם נדירים וטכניקות מוקפדות — חוויה קולינרית אישית ואקסקלוסיבית.',
  },
  {
    id: 'food',
    image: '/images/carousel-fish-tacos.jpeg',
    title: 'מטבח. מעבדה. חוויה.',
    subtitle: 'כל מנה נבנית כמו ניסוי מדויק — איזון של טעם, מרקם וארומה עד לפרט האחרון.',
  },
  {
    id: 'table',
    image: '/images/carousel-guests.jpeg',
    title: 'ארוחות פרטיות שנחקקות בזיכרון',
    subtitle: 'שולחן שף אינטימי, אירועים אישיים ותפריטים אישיים המעוצבים במיוחד עבורכם.',
  },
];
