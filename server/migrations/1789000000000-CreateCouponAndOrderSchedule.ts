import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

/**
 * קופונים + שדות הנחה ומועד מתוזמן בהזמנה.
 * הכל מותנה בקיום, כדי שיעבוד גם על מסד שכבר הורץ עליו חלק מהשינויים.
 */
export class CreateCouponAndOrderSchedule1789000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DO $$ BEGIN
        CREATE TYPE "${DB_SCHEMA}"."coupon_type_enum" AS ENUM('PERCENT', 'FIXED');
      EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "${DB_SCHEMA}"."coupon" (
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" character varying NOT NULL,
        "type" "${DB_SCHEMA}"."coupon_type_enum" NOT NULL,
        "value" integer NOT NULL,
        "min_subtotal" integer NOT NULL DEFAULT 0,
        "expires_at" TIMESTAMP,
        "max_uses" integer,
        "used_count" integer NOT NULL DEFAULT 0,
        "is_active" boolean NOT NULL DEFAULT true,
        "create_date" TIMESTAMP NOT NULL DEFAULT now(),
        "update_date" TIMESTAMP NOT NULL DEFAULT now(),
        "delete_date" TIMESTAMP,
        CONSTRAINT "PK_coupon_uuid" PRIMARY KEY ("uuid"),
        CONSTRAINT "UQ_coupon_code" UNIQUE ("code")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD COLUMN IF NOT EXISTS "coupon_code" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD COLUMN IF NOT EXISTS "discount" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD COLUMN IF NOT EXISTS "scheduled_for" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN IF EXISTS "scheduled_for"`,
    );
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN IF EXISTS "discount"`);
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN IF EXISTS "coupon_code"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "${DB_SCHEMA}"."coupon"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "${DB_SCHEMA}"."coupon_type_enum"`);
  }
}
