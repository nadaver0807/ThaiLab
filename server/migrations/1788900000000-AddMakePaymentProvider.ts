import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

const PROVIDER_ENUM = `"${DB_SCHEMA}"."order_payment_provider_enum"`;

export class AddMakePaymentProvider1788900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE ${PROVIDER_ENUM} ADD VALUE IF NOT EXISTS 'MAKE'`);
  }

  public async down(): Promise<void> {
    // Postgres אינו תומך בהסרת ערך מ-enum — אין מה לבטל
  }
}
