import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

const PROVIDER_ENUM = `"${DB_SCHEMA}"."order_payment_provider_enum"`;

export class AddPaymentProvider1788550000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE ${PROVIDER_ENUM} AS ENUM ('NONE', 'CARDCOM', 'PAYPLUS', 'TRANZILA', 'MESHULAM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order"
       ADD COLUMN "payment_provider" ${PROVIDER_ENUM} NOT NULL DEFAULT 'NONE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD COLUMN "payment_reference" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "payment_reference"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "payment_provider"`);
    await queryRunner.query(`DROP TYPE ${PROVIDER_ENUM}`);
  }
}
