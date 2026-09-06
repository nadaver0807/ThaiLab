import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

export class CreateReviewTable1788250000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "${DB_SCHEMA}"."review_service_type_enum" AS ENUM('TAKE_AWAY_DELIVERY', 'CHEF_AT_HOME', 'PRIVATE_EVENTS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "${DB_SCHEMA}"."review_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."review" (
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "author_name" character varying NOT NULL,
        "author_email" character varying NOT NULL,
        "service_type" "${DB_SCHEMA}"."review_service_type_enum" NOT NULL,
        "order_uuid" uuid,
        "rating" integer NOT NULL,
        "title" character varying,
        "content" text NOT NULL,
        "status" "${DB_SCHEMA}"."review_status_enum" NOT NULL DEFAULT 'PENDING',
        "create_date" TIMESTAMP NOT NULL DEFAULT now(),
        "update_date" TIMESTAMP NOT NULL DEFAULT now(),
        "delete_date" TIMESTAMP,
        CONSTRAINT "PK_review_uuid" PRIMARY KEY ("uuid")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_review_status" ON "${DB_SCHEMA}"."review" ("status")`,
    );
    // הזמנה אחת — ביקורת אחת
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_review_order_uuid" ON "${DB_SCHEMA}"."review" ("order_uuid") WHERE "order_uuid" IS NOT NULL AND "delete_date" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "${DB_SCHEMA}"."UQ_review_order_uuid"`);
    await queryRunner.query(`DROP INDEX "${DB_SCHEMA}"."IDX_review_status"`);
    await queryRunner.query(`DROP TABLE "${DB_SCHEMA}"."review"`);
    await queryRunner.query(`DROP TYPE "${DB_SCHEMA}"."review_status_enum"`);
    await queryRunner.query(`DROP TYPE "${DB_SCHEMA}"."review_service_type_enum"`);
  }
}
