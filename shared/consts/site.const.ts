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
    whatsapp: 'https://wa.me/972501234567',
  },
};

export const NAV_LINKS: NavLink[] = [
  { href: Route.Home, label: 'בית' },
  { href: Route.Menu, label: 'תפריט' },
  { href: Route.About, label: 'אודות' },
  { href: Route.Contact, label: 'צור קשר' },
];

export const SEARCH_DEBOUNCE_MS = 300;

export const QUERY_STALE_TIME_MS = 5 * 60 * 1000;
