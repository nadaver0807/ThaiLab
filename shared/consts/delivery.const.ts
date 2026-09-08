/**
 * אזורי המשלוח של ThaiLab.
 *
 * המשלוחים יוצאים מבת שלמה, ולכן המחיר נקבע לפי מרחק הישוב:
 * ישובי הטבעת הראשונה בתעריף הבסיסי, והטבעת השנייה בתעריף המורחב.
 * להוספה או הסרה של ישוב — לערוך את המערכים כאן בלבד.
 */

/** מינימום הזמנה (סכום ביניים, ללא דמי משלוח) שנדרש כדי לצאת למשלוח. */
export const DELIVERY_MIN_SUBTOTAL = 150;

/** תעריף הטבעת הראשונה — הישובים הסמוכים לבת שלמה. */
export const DELIVERY_FEE_NEAR = 25;

/** תעריף הטבעת השנייה — ישובים מעט רחוקים יותר. */
export const DELIVERY_FEE_FAR = 35;

export type DeliveryZone = {
  id: string;
  label: string;
  fee: number;
  cities: string[];
};

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'near',
    label: `אזור קרוב — ₪${DELIVERY_FEE_NEAR}`,
    fee: DELIVERY_FEE_NEAR,
    cities: [
      'בת שלמה',
      'זכרון יעקב',
      'עופר',
      'יקנעם עילית',
      'יקנעם מושבה',
      'גבעת עדה',
      'אליקים',
      'עמיקם',
    ],
  },
  {
    id: 'far',
    label: `אזור מורחב — ₪${DELIVERY_FEE_FAR}`,
    fee: DELIVERY_FEE_FAR,
    cities: [
      'עין איילה',
      'עין הוד',
      'הבונים',
      'בנימינה',
      'כרם מהר"ל',
      'צרופה',
      'מעגן מיכאל',
      'מעיין צבי',
      'שדות ים',
      'אור עקיבא',
      'פרדס חנה-כרכור',
    ],
  },
];

/** כל הישובים שאליהם יוצא משלוח, ממוינים אלפביתית לתצוגה ברשימה. */
export const DELIVERY_CITIES: string[] = DELIVERY_ZONES.flatMap((zone) => zone.cities)
  .slice()
  .sort((first, second) => first.localeCompare(second, 'he'));

/** מחזיר את דמי המשלוח לישוב, או null אם לא מבצעים אליו משלוחים. */
export const getDeliveryFee = (city?: string | null): number | null => {
  const normalized = city?.trim();

  if (!normalized) {
    return null;
  }

  const zone = DELIVERY_ZONES.find((current) => current.cities.includes(normalized));

  return zone ? zone.fee : null;
};

/** האם ניתן להזמין משלוח לישוב הזה. */
export const isDeliverableCity = (city?: string | null): boolean => getDeliveryFee(city) !== null;
