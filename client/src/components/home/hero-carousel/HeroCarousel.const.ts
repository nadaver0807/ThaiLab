import { type HeroSlide } from '@components/home/hero-carousel/HeroCarousel.type';

export const HERO_SLIDE_INTERVAL_MS = 6000;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'interior',
    image: '/images/carousel-scallops.jpeg',
    title: 'מטבח הוא מעבדה',
    subtitle:
      'לקחת טעם מוכר, לשחק איתו, לפרק אותו ולהרכיב אותו מחדש — זו הדרך שלי לספר את המטבח ' +
      'התאילנדי.',
  },
  {
    id: 'food',
    image: '/images/carousel-fish-tacos.jpeg',
    title: 'אוכל תאילנדי אמיתי',
    subtitle:
      'איזון בין חריף, חמוץ, מתוק, מלוח ומריר — וגם הרבה מעבר לזה. חומרי גלם טובים והרבה סקרנות.',
  },
  {
    id: 'table',
    image: '/images/carousel-guests.jpeg',
    title: 'ארוחות טעימות בבת שלמה',
    subtitle: 'ערב שלם שנבנה סביב המטבח התאילנדי, באווירה אינטימית — מעבר לתפריט הקבוע.',
  },
];
