import { Route } from '@shared/enums/route.enum';
import { ServiceType } from '@shared/enums/service-type.enum';
import { WHATSAPP_MESSAGE } from '@shared/consts/site.const';

export type ServiceOption = {
  type: ServiceType;
  title: string;
  /** משפט אחד שמסביר בדיוק מה זה — כדי שלא יהיה בלבול בין השלושה */
  summary: string;
  /** מה כולל השירות, בשורות קצרות */
  highlights: string[];
  href: string;
  ctaLabel: string;
  image: string;
  /** האם ההזמנה מתבצעת באתר או בפנייה אישית */
  isSelfService: boolean;
  whatsappMessage?: string;
};

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    type: ServiceType.TakeAwayDelivery,
    title: 'ThaiLab בבית',
    summary:
      'לא תמיד צריך להזמין שולחן כדי לאכול תאילנדי טוב. בכל שבוע אני פותח את המטבח להזמנות ' +
      'מוגבלות של מנות — מוכנות לקחת הביתה, לחמם, לפתוח וליהנות.',
    highlights: ['הזמנה ישירה מהאתר', 'איסוף עצמי או משלוח', 'כמות מוגבלת בכל שבוע'],
    href: Route.Menu,
    ctaLabel: 'לתפריט ולהזמנה',
    image: '/images/shrimp.jpeg',
    isSelfService: true,
  },
  {
    type: ServiceType.ChefAtHome,
    title: 'ארוחות טעימות',
    summary:
      'ערב שלם שנבנה סביב המטבח התאילנדי. מספר מנות, חומרי גלם מיוחדים, טעמים משתנים והרבה ' +
      'מקום להפתעות — באווירה אינטימית אצלי בבת שלמה.',
    highlights: ['אצלי בבית / בגג', 'בתאריכים מוגדרים מראש', 'קבוצות קטנות'],
    href: Route.ChefAtHome,
    ctaLabel: 'לפרטים ולתאריכים',
    image: '/images/carousel-guests.jpeg',
    isSelfService: false,
    whatsappMessage: WHATSAPP_MESSAGE.chefAtHome,
  },
  {
    type: ServiceType.PrivateEvents,
    title: 'ThaiLab מגיע אליכם',
    summary:
      'אירוע קטן, ארוחה משפחתית, ערב עם חברים או אירוע מיוחד. אני מגיע עם המטבח שלי ובונה ' +
      'יחד איתכם תפריט שמתאים לאירוע, למקום ולאנשים שיושבים סביב השולחן.',
    highlights: ['אצלכם או במקום אחר', 'תפריט שנבנה יחד', 'הצעת מחיר אישית'],
    href: Route.PrivateEvents,
    ctaLabel: 'לקבלת הצעה',
    image: '/images/ofer-serving.jpeg',
    isSelfService: false,
    whatsappMessage: WHATSAPP_MESSAGE.privateEvent,
  },
];
