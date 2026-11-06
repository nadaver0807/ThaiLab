import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

/**
 * שעות פעילות הניתנות לעריכה. שבע שורות, אחת לכל יום, עם ערכי ההתחלה שהיו
 * קבועים בקוד (ראשון–חמישי 12:00–21:00).
 */
export class CreateOpeningHours1789100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "${DB_SCHEMA}"."opening_hours" (
        "day" integer NOT NULL,
        "is_open" boolean NOT NULL DEFAULT true,
        "open" character varying(5) NOT NULL,
        "close" character varying(5) NOT NULL,
        "update_date" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_opening_hours_day" PRIMARY KEY ("day")
      )`,
    );
    await queryRunner.query(
      `INSERT INTO "${DB_SCHEMA}"."opening_hours" ("day", "is_open", "open", "close")
       VALUES
        (0, true, '12:00', '21:00'),
        (1, true, '12:00', '21:00'),
        (2, true, '12:00', '21:00'),
        (3, true, '12:00', '21:00'),
        (4, true, '12:00', '21:00'),
        (5, false, '12:00', '21:00'),
        (6, false, '12:00', '21:00')
       ON CONFLICT ("day") DO NOTHING`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "${DB_SCHEMA}"."opening_hours"`);
  }
}
