import { DishCategory } from '@shared/enums/dish-category.enum';
import { SpiceLevel } from '@shared/enums/spice-level.enum';
import { type PriceOptions } from '@shared/types/general.type';

export type DishSeed = {
  name: string;
  description: string;
  menuCategory: DishCategory;
  priceOptions: PriceOptions;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spiceLevel: SpiceLevel;
  notes: string | null;
  displayOrder: number;
};

/** ממיר את דירוג החריפות המספרי (0-3) לערך ה-enum. */
const SPICE_BY_LEVEL: Record<number, SpiceLevel> = {
  0: SpiceLevel.None,
  1: SpiceLevel.Mild,
  2: SpiceLevel.Medium,
  3: SpiceLevel.Hot,
};

export const toSpiceLevel = (level: number): SpiceLevel => SPICE_BY_LEVEL[level] ?? SpiceLevel.None;

export const DISH_SEEDS: DishSeed[] = [
  {
    name: 'סום טאם',
    description: "פפאיה בוסר, עגבניות שרי, שעועית תאילנדית, כוסברה, צ'ילי חריף ובוטנים קלויים.",
    menuCategory: DishCategory.Salads,
    priceOptions: { default: 45 },
    isVegetarian: false,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(3),
    notes: null,
    displayOrder: 1,
  },
  {
    name: 'יאם ממואנג',
    description:
      "מנגו ירוק, למון גראס, כוסברה, נענע, בצל ירוק, בצל סגול, צ'ילי, ליים, רוטב דגים, עלי כפיר ליים וקשיו קלוי.",
    menuCategory: DishCategory.Salads,
    priceOptions: { default: 60 },
    isVegetarian: false,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(2),
    notes: null,
    displayOrder: 2,
  },
  {
    name: 'יאם טקאי',
    description:
      "דג פריך, למון גראס, בצל סגול, כרוב, ג'ינג'ר, בצל ירוק, כוסברה, נענע, קשיו קלוי, צ'ילי וליים.",
    menuCategory: DishCategory.Salads,
    priceOptions: { default: 55 },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: toSpiceLevel(2),
    notes: null,
    displayOrder: 3,
  },
  {
    name: "סביצ'ה אינטיאס",
    description:
      "אינטיאס טרי, כוסברה, נענע, ליים, צ'ילי וקאו קואה — אורז קלוי טחון שמוסיף עומק וקראנץ' עדין.",
    menuCategory: DishCategory.Starters,
    priceOptions: { default: 65 },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(1),
    notes: null,
    displayOrder: 4,
  },
  {
    name: 'לאפ גאי',
    description:
      "עוף מוקפץ עם עשבים טריים, למון גראס וצ'ילי, ברוטב רענן של ליים, צ'ילי ורוטב דגים.",
    menuCategory: DishCategory.Starters,
    priceOptions: { default: 55 },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: toSpiceLevel(2),
    notes: null,
    displayOrder: 5,
  },
  {
    name: 'נאם טוק סינטה',
    description:
      "סינטה צרובה למדיום-רייר ומעושנת, עם נענע, שאלוט, כוסברה, צ'ילי וליים. מנה ארומטית, עוצמתית וחריפה.",
    menuCategory: DishCategory.Starters,
    priceOptions: { default: 70 },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(3),
    notes: null,
    displayOrder: 6,
  },
  {
    name: 'פאד תאי',
    description:
      'אטריות אורז מוקפצות עם ביצה, נבטים, בצל ירוק ורוטב תמרינדי אותנטי. מוגש עם בוטנים קלויים, ליים וכוסברה.',
    menuCategory: DishCategory.Mains,
    priceOptions: { 'עוף / טופו': 65, שרימפס: 75 },
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    spiceLevel: toSpiceLevel(0),
    notes: 'גרסה צמחונית עם ביצה | גרסה טבעונית ללא ביצה',
    displayOrder: 7,
  },
  {
    name: 'עוף / טופו בקשיו',
    description:
      "עוף או טופו פריכים מוקפצים עם שום, בצל, גזר, באק צ'וי ובצל ירוק, ברוטב עשיר עם קשיו קלוי.",
    menuCategory: DishCategory.Mains,
    priceOptions: { default: 70 },
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(0),
    notes: 'גרסת טופו או גרסה כשרה עם עוף מוגשת ברוטב פטריות במקום רוטב צדפות',
    displayOrder: 8,
  },
  {
    name: 'מאסאמאן קארי',
    description:
      'עוף / טופו, חלב קוקוס, תפוחי אדמה, בצל, כוכב אניס, עלי כפיר ליים, קינמון ובוטנים קלויים. מוגש עם אורז מאודה.',
    menuCategory: DishCategory.Mains,
    priceOptions: { default: 75 },
    isVegetarian: false,
    isVegan: true,
    isGlutenFree: false,
    spiceLevel: toSpiceLevel(2),
    notes: null,
    displayOrder: 9,
  },
  {
    name: 'קארי אדום',
    description:
      "דג פריך / שרימפס בתבשיל חלב קוקוס עם קארי אדום מתקתק, שעועית תאילנדית, דלעת תאילנדית, בזיליקום תאילנדי, עלי כפיר ליים וצ'ילי. מוגש עם אורז מאודה.",
    menuCategory: DishCategory.Mains,
    priceOptions: { default: 80 },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(3),
    notes: null,
    displayOrder: 10,
  },
  {
    name: 'פאד קאפאו',
    description:
      'עוף / פירות ים מוקפצים עם שום, שאלוט, רוטב צדפות וסויה, בזיליקום תאילנדי וביצת עין. מוגש לצד אורז יסמין.',
    menuCategory: DishCategory.Mains,
    priceOptions: { עוף: 70, 'פירות ים': 85 },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: toSpiceLevel(3),
    notes: null,
    displayOrder: 11,
  },
  {
    name: 'דג צלוי בעלי בננה',
    description:
      'דג טרי עטוף בעלי בננה ונצלה בעדינות, עם שפע עשבים טריים ורוטב תאילנדי עשיר ומדויק שנועד לאכול יחד עם הדג.',
    menuCategory: DishCategory.Mains,
    priceOptions: { default: 90 },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(1),
    notes: null,
    displayOrder: 12,
  },
  {
    name: 'סטיקי רייס',
    description: '',
    menuCategory: DishCategory.Sides,
    priceOptions: { default: 15 },
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(0),
    notes: null,
    displayOrder: 13,
  },
  {
    name: 'אורז מאודה',
    description: '',
    menuCategory: DishCategory.Sides,
    priceOptions: { default: 15 },
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(0),
    notes: null,
    displayOrder: 14,
  },
  {
    name: 'סטיקי רייס מנגו',
    description: 'אורז דביק מבושל בקרם קוקוס מתקתק, עם מנגו טרי ועלי כפיר ליים.',
    menuCategory: DishCategory.Desserts,
    priceOptions: { default: 35 },
    isVegetarian: false,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(0),
    notes: null,
    displayOrder: 15,
  },
  {
    name: 'קאנום טום',
    description: 'כדורי אורז דביק ממולאים בקוקוס קלוי, עטופים בקוקוס טרי ואותנטי.',
    menuCategory: DishCategory.Desserts,
    priceOptions: { default: 35 },
    isVegetarian: false,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: toSpiceLevel(0),
    notes: null,
    displayOrder: 16,
  },
];
