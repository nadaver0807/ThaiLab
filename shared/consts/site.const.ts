import { Route } from '@shared/enums/index.enum';
import { type NavLink, type SiteConfig } from '@shared/types/site.type';

export const SITE: SiteConfig = {
  name: 'ThaiLab',
  tagline: 'אוכל תאילנדי אותנטי',
  description: 'מסעדת אוכל תאילנדי אותנטי — מנות טריות, חומרי גלם איכותיים וטעמים אמיתיים מתאילנד.',
  phone: '',
  email: '',
  address: '',
  social: {
    instagram: '',
    facebook: '',
    whatsapp: '',
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
