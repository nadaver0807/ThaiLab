import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

/**
 * משלים את העמודה `order_uuid` בטבלת הביקורות.
 *
 * העמודה נוספה ל-`CreateReviewTable1788250000000` לאחר שהמיגרציה כבר רצה,
 * ולכן היא חסרה במסדי נתונים קיימים. המיגרציה הזו מיישרת אותם.
 * הכל מותנה בקיום כדי שגם מסד נתונים חדש (שנוצר עם העמודה) יעבור בשלום.
 */
export class AddReviewOrderUuid1788750000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."review" ADD COLUMN IF NOT EXISTS "order_uuid" uuid`,
    );
    // הזמנה אחת — ביקורת אחת
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "UQ_review_order_uuid"
       ON "${DB_SCHEMA}"."review" ("order_uuid")
       WHERE "order_uuid" IS NOT NULL AND "delete_date" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "${DB_SCHEMA}"."UQ_review_order_uuid"`);
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."review" DROP COLUMN IF EXISTS "order_uuid"`,
    );
  }
}
