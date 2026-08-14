import { Route } from '@shared/enums/index.enum';
import { type OrderCategory } from './OrderCategories.type';

export const ORDER_CATEGORIES: OrderCategory[] = [
  {
    id: 'takeaway',
    title: 'טייק אוואי ומשלוחים',
    subtitle: 'לארוחה של היום',
    description: 'המנות הקלאסיות של המטבח, ארוזות חם ומוכנות לדרך — עד הבית או לאיסוף עצמי.',
    image: '/images/category-takeaway.jpg',
    href: Route.Menu,
    actionLabel: 'להזמנה',
  },
  {
    id: 'tasting',
    title: 'ארוחות טעימות',
    subtitle: 'חוויה של ערב שלם',
    description: 'סדרת מנות מתחלפת שאני בונה לפי העונה, לערב אחד של טעמים מלאים.',
    image: '/images/category-tasting.jpg',
    href: Route.Menu,
    actionLabel: 'לארוחות הטעימות',
  },
  {
    id: 'catering',
    title: 'קייטרינג וארוחות פרטיות',
    subtitle: 'אני מגיע אליכם',
    description: 'ארוחת שף אצלכם בבית, מהתכנון ועד ההגשה — לאירועים קטנים ואינטימיים.',
    image: '/images/category-catering.jpg',
    href: Route.Contact,
    actionLabel: 'לתיאום אירוע',
  },
];
