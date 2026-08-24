import { Route } from '@shared/enums/route.enum';
import { type MenuLink } from './MenuLinks.type';

export const MENU_LINKS: MenuLink[] = [
  {
    id: 'starters',
    title: 'רשימת מתכונים',
    subtitle: 'מנות פתיחה',
    description: 'סלט סום־טאם, ספרינג רולס וטום יאם — פתיחה תוססת וטרייה.',
    href: Route.Menu,
    tone: 'green',
  },
  {
    id: 'mains',
    title: 'רשימת מתכונים',
    subtitle: 'מנות עיקריות',
    description: 'פאד תאי, קארי ירוק ואטריות ווק — הלב של המטבח שלנו.',
    href: Route.Menu,
    tone: 'cream',
  },
  {
    id: 'desserts',
    title: 'רשימת מתכונים',
    subtitle: 'קינוחים',
    description: 'מנגו סטיקי רייס ופנקוטה קוקוס — סיום מתוק ומרענן.',
    href: Route.Menu,
    tone: 'green',
  },
];
