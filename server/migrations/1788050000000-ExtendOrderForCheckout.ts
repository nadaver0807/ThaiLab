import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

export class ExtendOrderForCheckout1788050000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "${DB_SCHEMA}"."order_payment_method_enum" AS ENUM('ON_COLLECTION', 'CREDIT_CARD')`,
    );
    await queryRunner.query(
      `CREATE TYPE "${DB_SCHEMA}"."order_payment_status_enum" AS ENUM('UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED')`,
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" DROP CONSTRAINT "UQ_6895c60f60b942a7e7efe02a2b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ALTER COLUMN "last_name" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ADD "address" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."costumer" SET "phone" = regexp_replace("phone", '\\D', '', 'g')`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_costumer_phone" ON "${DB_SCHEMA}"."costumer" ("phone")`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "subtotal" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "delivery_fee" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" ADD "address" character varying`);
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "contact_name" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "contact_phone" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "payment_method" "${DB_SCHEMA}"."order_payment_method_enum" NOT NULL DEFAULT 'ON_COLLECTION'`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "payment_status" "${DB_SCHEMA}"."order_payment_status_enum" NOT NULL DEFAULT 'UNPAID'`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`UPDATE "${DB_SCHEMA}"."order" SET "subtotal" = "total_price"`);
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order_item" ADD "dish_name" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order_item" ADD "price_key" character varying NOT NULL DEFAULT 'default'`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order_item" ALTER COLUMN "special_request" DROP NOT NULL`,
    );
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."order_item" AS oi SET "dish_name" = d."name" FROM "${DB_SCHEMA}"."dish" AS d WHERE oi."dish_uuid" = d."uuid"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order_item" ALTER COLUMN "special_request" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order_item" DROP COLUMN "price_key"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order_item" DROP COLUMN "dish_name"`);

    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "update_date"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "payment_status"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "payment_method"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "contact_phone"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "contact_name"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "delivery_fee"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order" DROP COLUMN "subtotal"`);

    await queryRunner.query(`DROP INDEX "${DB_SCHEMA}"."UQ_costumer_phone"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."costumer" DROP COLUMN "update_date"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."costumer" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ALTER COLUMN "last_name" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."costumer" ADD CONSTRAINT "UQ_6895c60f60b942a7e7efe02a2b2" UNIQUE ("email")`,
    );

    await queryRunner.query(`DROP TYPE "${DB_SCHEMA}"."order_payment_status_enum"`);
    await queryRunner.query(`DROP TYPE "${DB_SCHEMA}"."order_payment_method_enum"`);
  }
}
