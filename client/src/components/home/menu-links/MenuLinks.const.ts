import { Route } from '@shared/enums/route.enum';
import { type MenuLink } from './MenuLinks.type';

export const MENU_LINKS: MenuLink[] = [
  {
    id: 'masterclass',
    title: 'Masterclass Menu',
    subtitle: 'סדנת שף',
    description: 'חוויה אינטראקטיבית שבה נחשפים לטכניקות, לתבלינים ולסודות המטבח התאילנדי.',
    href: Route.Menu,
    tone: 'dark',
  },
  {
    id: 'curated',
    title: 'Curated Dining',
    subtitle: 'ארוחה אישית',
    description: 'תפריט טעימות מעוצב אישית — רצף מנות מדויק שנבנה סביב הטעמים שלכם.',
    href: Route.Menu,
    tone: 'cream',
  },
  {
    id: 'chefs-table',
    title: "Chef's Table",
    subtitle: 'שולחן השף',
    description: 'ישיבה אינטימית מול תחנת השף — הגשה חיה, פרטית ובלתי נשכחת.',
    href: Route.Menu,
    tone: 'dark',
  },
];
