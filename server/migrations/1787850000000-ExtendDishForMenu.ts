import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

export class ExtendDishForMenu1787850000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "${DB_SCHEMA}"."dish_menu_category_enum" AS ENUM('SALADS', 'STARTERS', 'MAINS', 'SIDES', 'DESSERTS')`,
    );

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "menu_category" "${DB_SCHEMA}"."dish_menu_category_enum" NOT NULL DEFAULT 'MAINS'`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "price_options" jsonb NOT NULL DEFAULT '{}'::jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "is_vegetarian" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "is_vegan" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "is_gluten_free" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" ADD "notes" character varying`);
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "display_order" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );

    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."dish" SET "price_options" = jsonb_build_object('default', "price")`,
    );
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "stock"`);
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ALTER COLUMN "image_url" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ALTER COLUMN "description" SET DEFAULT ''`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_admin_user_email_lower" ON "${DB_SCHEMA}"."admin_user" (LOWER("email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "${DB_SCHEMA}"."UQ_admin_user_email_lower"`);

    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ALTER COLUMN "description" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ALTER COLUMN "image_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "stock" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD "price" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."dish" SET "price" = COALESCE(("price_options"->>'default')::int, 0)`,
    );

    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "update_date"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "display_order"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "notes"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "is_gluten_free"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "is_vegan"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "is_vegetarian"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "price_options"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "menu_category"`);

    await queryRunner.query(`DROP TYPE "${DB_SCHEMA}"."dish_menu_category_enum"`);
  }
}
