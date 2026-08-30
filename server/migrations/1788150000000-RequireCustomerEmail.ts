import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

export class RequireCustomerEmail1788150000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "contact_email" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."order" AS o SET "contact_email" = COALESCE(c."email", '') FROM "${DB_SCHEMA}"."costumer" AS c WHERE o."costumer_uuid" = c."uuid"`,
    );
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."costumer" SET "email" = CONCAT('unknown+', "uuid", '@thailab.co.il') WHERE "email" IS NULL OR "email" = ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ALTER COLUMN "email" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "contact_email"`);
  }
}
