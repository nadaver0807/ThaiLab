import { Route } from '@shared/enums/route.enum';
import { type NavLink, type SiteConfig } from '@shared/types/site.type';

export const SITE: SiteConfig = {
  name: 'ThaiLab',
  tagline: 'מטבח תאילנדי אותנטי',
  description: 'ThaiLab — מטבח תאילנדי אותנטי, חומרי גלם טריים וטעמים אמיתיים מתאילנד.',
  phone: '055-5567083',
  email: 'hello@thailab.co.il',
  address: 'הזית 18, בת שלמה',
  social: {
    instagram: 'https://www.instagram.com/thai__lab',
    facebook: 'https://facebook.com/thailab',
    whatsapp: 'https://wa.me/972555567083',
    whatsappGroup: 'https://chat.whatsapp.com/Ki8ngpp4EQy1yPgMxy64k4?s=cl&p=a&mlu=0&ilr=4',
  },
};

/** הודעה מוכנה מראש לפנייה בוואטסאפ לפי נושא. */
export const WHATSAPP_MESSAGE = {
  general: 'היי עופר, הגעתי מהאתר של ThaiLab ורציתי לשאול משהו',
  chefAtHome: 'היי עופר, מעניין אותי לשמוע על ארוחת שף בבת שלמה',
  privateEvent: 'היי עופר, אשמח לקבל הצעה לאירוע פרטי',
} as const;

/** בונה קישור וואטסאפ עם הודעה מוכנה. */
export const buildWhatsappLink = (message: string): string =>
  `${SITE.social.whatsapp}?text=${encodeURIComponent(message)}`;

export const NAV_LINKS: NavLink[] = [
  { href: Route.Home, label: 'בית' },
  { href: Route.Menu, label: 'טייק אווי ומשלוחים' },
  { href: Route.ChefAtHome, label: 'ארוחות שף' },
  { href: Route.PrivateEvents, label: 'אירועים פרטיים' },
  { href: Route.About, label: 'אודות' },
  { href: Route.Contact, label: 'צור קשר' },
];

export const SEARCH_DEBOUNCE_MS = 300;

export const QUERY_STALE_TIME_MS = 5 * 60 * 1000;
