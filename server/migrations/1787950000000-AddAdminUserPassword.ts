import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

export class AddAdminUserPassword1787950000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "${DB_SCHEMA}"."admin_user"`);

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."admin_user" ADD "password_hash" character varying NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."admin_user" ADD CONSTRAINT "UQ_admin_user_email" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."admin_user" DROP CONSTRAINT "UQ_admin_user_email"`,
    );
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."admin_user" DROP COLUMN "password_hash"`);
  }
}
