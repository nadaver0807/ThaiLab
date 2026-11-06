/**
 * חלונות הזמן להזמנה מתוזמנת.
 *
 * הלקוח בוחר חלון בקפיצות של רבע שעה. השרת מאמת את אותם כללים, ולכן הערכים כאן
 * משותפים לשני הצדדים.
 */

import { type OpeningHoursDay } from '@shared/types/opening-hours.type';

/** גודל חלון הזמן בדקות. */
export const SLOT_MINUTES = 15;

/** כמה זמן מראש לפחות צריך להזמין (בדקות), כדי שיהיה זמן להכין. */
export const MIN_LEAD_MINUTES = 45;

/** כמה ימים קדימה אפשר לתזמן הזמנה. */
export const MAX_DAYS_AHEAD = 7;

/**
 * שעות ברירת מחדל — משמשות כשעדיין לא נשמרו שעות בפאנל הניהול, וכערכי ההתחלה במסד.
 * 0 = יום ראשון … 6 = שבת.
 */
export const DEFAULT_OPENING_HOURS: OpeningHoursDay[] = [
  { day: 0, isOpen: true, open: '12:00', close: '21:00' },
  { day: 1, isOpen: true, open: '12:00', close: '21:00' },
  { day: 2, isOpen: true, open: '12:00', close: '21:00' },
  { day: 3, isOpen: true, open: '12:00', close: '21:00' },
  { day: 4, isOpen: true, open: '12:00', close: '21:00' },
  { day: 5, isOpen: false, open: '12:00', close: '21:00' },
  { day: 6, isOpen: false, open: '12:00', close: '21:00' },
];
