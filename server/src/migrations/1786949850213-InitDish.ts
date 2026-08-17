import dotenv from "dotenv";
import type { MigrationInterface, QueryRunner } from "typeorm";

dotenv.config();

const { DB_SCHEMA } = process.env;

export class InitDish1786949850213 implements MigrationInterface {
  name = "InitDish1786949850213";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${DB_SCHEMA}"."dish" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "image_url" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, CONSTRAINT "PK_3badb9ce39f7a2529ddf75d1132" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "${DB_SCHEMA}"."dish"`);
  }
}
