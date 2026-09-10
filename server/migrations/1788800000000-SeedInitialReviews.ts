import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

/**
 * ביקורות אמיתיות שהתקבלו מלקוחות בוואטסאפ לפני שהאתר עלה.
 *
 * התוכן נוקה מפניות אישיות ומשגיאות כתיב, אך המסר נשמר כפי שנכתב.
 * הביקורות נכנסות כ-APPROVED כי הן כבר אושרו בפועל על ידי עופר.
 *
 * `author_name` הוא גנרי במכוון — אין לנו את שמות הלקוחות, ואסור להמציא
 * ייחוס לביקורת ציבורית. כשיהיו שמות אמיתיים אפשר לעדכן אותם בפאנל הניהול.
 */
const REVIEWS: { serviceType: string; content: string }[] = [
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content: 'האוכל מדויק, טרי, איכותי וטעים ממש ממש. שאפו לעופר — יש לו יד מדהימה. כישרון גדול.',
  },
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content: 'וואו, זה היה אפילו יותר טעים מהפעם הקודמת. תודה!',
  },
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content:
      'נהנינו מאוד! האוכל טעים ברמה של מסעדה מעולה. מורגשת ההקפדה על הפרטים — חוויה תאילנדית אמיתית. תודה.',
  },
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content: 'האוכל היה מדהים. תודה רבה!',
  },
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content:
      'מעולה! הילדים אצלנו אניני טעם ונתנו ציון גבוה מאוד. אהבנו הכל — יאם טקאי מעולה, הסום טאם וסלט המנגו אליפות, והמאסאמאן מנצח. גם הטופו בקשיו היה מוצלח. שבעים ומרוצים.',
  },
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content:
      'טעים מאוד, הכל, באמת. סלט המנגו היה מעולה ואהבנו את הטעם המעושן של השרימפס. הגולש התאילנדי ממש טעים — החריפות של הבשר נטמעת יפה ברוטב ובאורז, מאוזן מאוד. אהבנו שיש מתיקות עדינה שמוטעמת באוכל. שאפו לעופר.',
  },
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content: 'נהנינו ממש, היה עונג גדול. הגזמנו בכמות — אכלנו יומיים והיה נפלא גם אחרי חימום.',
  },
  {
    serviceType: 'CHEF_AT_HOME',
    content: 'האוכל מטורף! האורחים שלי עפו על זה. תודה לעופר.',
  },
  {
    serviceType: 'TAKE_AWAY_DELIVERY',
    content:
      'האוכל היה מעולה, ממש. העוף בירקות טעים והרוטב חזק, השרימפס בקארי חריף ולא מתנצל. הסלט מדהים והרוטב שלו משלים את הרעננות.',
  },
];

export class SeedInitialReviews1788800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const { serviceType, content } of REVIEWS) {
      // ההכנסה מותנית כדי שהרצה חוזרת לא תשכפל ביקורות
      await queryRunner.query(
        `INSERT INTO "${DB_SCHEMA}"."review"
           ("author_name", "author_email", "service_type", "rating", "title", "content", "status")
         SELECT 'לקוח/ה', '', $1::"${DB_SCHEMA}"."review_service_type_enum", 5, NULL, $2,
                'APPROVED'::"${DB_SCHEMA}"."review_status_enum"
         WHERE NOT EXISTS (
           SELECT 1 FROM "${DB_SCHEMA}"."review" WHERE "content" = $2
         )`,
        [serviceType, content],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "${DB_SCHEMA}"."review" WHERE "content" = ANY($1)`, [
      REVIEWS.map(({ content }) => content),
    ]);
  }
}
