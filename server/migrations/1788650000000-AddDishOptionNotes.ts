import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

/**
 * ההערות המוכנות שעופר אישר לכל מנה — הלקוח יכול לסמן אותן בהזמנה.
 * המפתח הוא שם המנה כפי שהוא מופיע בתפריט.
 */
const OPTION_NOTES_BY_DISH: Record<string, string[]> = {
  'פאד תאי': ['בלי בוטנים', 'בלי כוסברה', 'בלי נבטים', 'בלי ביצה'],
  'סום טאם': ['בלי בוטנים'],
  'מאסאמאן קארי': ['בלי בוטנים'],
  'יאם ממואנג': ['בלי קשיו'],
  'יאם טקאי': ['בלי קשיו'],
};

export class AddDishOptionNotes1788650000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const [name, notes] of Object.entries(OPTION_NOTES_BY_DISH)) {
      await queryRunner.query(
        `UPDATE "${DB_SCHEMA}"."dish"
         SET "option_notes" = $1::jsonb
         WHERE "delete_date" IS NULL AND "name" = $2`,
        [JSON.stringify(notes), name],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."dish"
       SET "option_notes" = '[]'::jsonb
       WHERE "delete_date" IS NULL AND "name" = ANY($1)`,
      [Object.keys(OPTION_NOTES_BY_DISH)],
    );
  }
}
