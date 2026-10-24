import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

const PROVIDER_ENUM = `"${DB_SCHEMA}"."order_payment_provider_enum"`;

/** מוסיף את הערך "MAKE" לרשימת ספקי התשלום — הזמנות שעוברות דרך תרחיש Make.com. */
export class AddMakePaymentProvider1788900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE ${PROVIDER_ENUM} ADD VALUE IF NOT EXISTS 'MAKE'`);
  }

  public async down(): Promise<void> {
    // PostgreSQL אינו תומך בהסרת ערך מ-enum. הפיכת המיגרציה דורשת בנייה מחדש
    // של הטיפוס, אבל אין לכך צורך מעשי — אם יהיה צורך, תתווסף מיגרציה ייעודית.
  }
}
