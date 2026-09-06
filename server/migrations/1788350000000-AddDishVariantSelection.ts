import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

export class AddDishVariantSelection1788350000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD COLUMN "option_notes" jsonb NOT NULL DEFAULT '[]'::jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order_item" ADD COLUMN "variant_label" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."order_item" ADD COLUMN "selected_notes" jsonb NOT NULL DEFAULT '[]'::jsonb`,
    );
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."order_item"
       SET "variant_label" = "price_key"
       WHERE "price_key" <> 'default'`,
    );
    const dishes: { uuid: string; price_options: Record<string, number> }[] =
      await queryRunner.query(
        `SELECT "uuid", "price_options" FROM "${DB_SCHEMA}"."dish" WHERE "delete_date" IS NULL`,
      );

    for (const dish of dishes) {
      const entries = Object.entries(dish.price_options ?? {});

      if (!entries.some(([key]) => key.includes('/'))) {
        continue;
      }

      const expanded: Record<string, number> = {};

      for (const [key, price] of entries) {
        const options = key
          .split('/')
          .map((option) => option.trim())
          .filter(Boolean);

        for (const option of options.length ? options : [key]) {
          expanded[option] = price;
        }
      }

      await queryRunner.query(
        `UPDATE "${DB_SCHEMA}"."dish" SET "price_options" = $1::jsonb WHERE "uuid" = $2`,
        [JSON.stringify(expanded), dish.uuid],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order_item" DROP COLUMN "selected_notes"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order_item" DROP COLUMN "variant_label"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "option_notes"`);
  }
}
