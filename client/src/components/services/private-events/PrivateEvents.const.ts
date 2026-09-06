import { type ServiceDetailRow } from '@components/services/service-details/ServiceDetails';

export const PRIVATE_EVENTS_IMAGE = '/images/ofer-serving.jpeg';

export const PRIVATE_EVENTS_PARAGRAPHS: string[] = [
  'אירוע קטן, ארוחה משפחתית, ערב עם חברים או אירוע מיוחד.',
  'אני מגיע עם המטבח שלי ובונה יחד איתכם תפריט שמתאים לאירוע, למקום ולאנשים שיושבים סביב ' +
    'השולחן.',
];

// TODO: לאשר מול עופר — מינימום סועדים ואזורי שירות
export const PRIVATE_EVENTS_DETAILS: ServiceDetailRow[] = [
  { label: 'איפה', value: 'אצלכם — בית, גינה או מקום אחר' },
  { label: 'מינימום סועדים', value: 'נסגור בשיחה לפי סוג האירוע' },
  { label: 'התפריט', value: 'נבנה יחד לפי הטעמים שלכם ומה שיש בעונה' },
  { label: 'הצעת מחיר', value: 'כתבו לי בוואטסאפ עם תאריך, מספר אורחים ומיקום — ואחזור עם הצעה' },
];
