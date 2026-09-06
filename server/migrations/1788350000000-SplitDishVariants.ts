import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

type DishRow = {
  uuid: string;
  name: string;
  description: string;
  price_options: Record<string, number>;
  image_url: string | null;
  menu_category: string;
  spice_level: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  notes: string | null;
  display_order: number;
  is_available: boolean;
  category_uuid: string | null;
};

const DEFAULT_PRICE_KEY = 'default';

export class SplitDishVariants1788350000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD COLUMN "base_name" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "${DB_SCHEMA}"."dish" ADD COLUMN "variant_label" character varying`,
    );
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
       WHERE "price_key" <> '${DEFAULT_PRICE_KEY}'`,
    );
    await queryRunner.query(`UPDATE "${DB_SCHEMA}"."dish" SET "base_name" = "name"`);
    const dishes: DishRow[] = await queryRunner.query(
      `SELECT * FROM "${DB_SCHEMA}"."dish" WHERE "delete_date" IS NULL`,
    );
    for (const dish of dishes) {
      const entries = Object.entries(dish.price_options ?? {});

      if (entries.length <= 1) {
        const price = entries.length ? entries[0][1] : 0;

        await queryRunner.query(
          `UPDATE "${DB_SCHEMA}"."dish"
           SET "price_options" = $1::jsonb
           WHERE "uuid" = $2`,
          [JSON.stringify({ [DEFAULT_PRICE_KEY]: price }), dish.uuid],
        );

        continue;
      }

      const [firstLabel, firstPrice] = entries[0];

      // המנה המקורית הופכת לווריאציה הראשונה — כך הזמנות קיימות נשארות תקינות
      await queryRunner.query(
        `UPDATE "${DB_SCHEMA}"."dish"
         SET "name" = $1, "variant_label" = $2, "price_options" = $3::jsonb, "display_order" = $4
         WHERE "uuid" = $5`,
        [
          `${dish.name} — ${firstLabel}`,
          firstLabel,
          JSON.stringify({ [DEFAULT_PRICE_KEY]: firstPrice }),
          dish.display_order * 100,
          dish.uuid,
        ],
      );
      for (const [label, price] of entries.slice(1)) {
        await queryRunner.query(
          `INSERT INTO "${DB_SCHEMA}"."dish" (
            "name", "base_name", "variant_label", "description", "price_options", "option_notes",
            "image_url", "menu_category", "spice_level", "is_vegetarian", "is_vegan",
            "is_gluten_free", "notes", "display_order", "is_available", "category_uuid"
          ) VALUES ($1, $2, $3, $4, $5::jsonb, '[]'::jsonb, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
          [
            `${dish.name} — ${label}`,
            dish.name,
            label,
            dish.description,
            JSON.stringify({ [DEFAULT_PRICE_KEY]: price }),
            dish.image_url,
            dish.menu_category,
            dish.spice_level,
            dish.is_vegetarian,
            dish.is_vegan,
            dish.is_gluten_free,
            dish.notes,
            dish.display_order * 100 + entries.findIndex(([key]) => key === label),
            dish.is_available,
            dish.category_uuid,
          ],
        );
      }
    }
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."order_item" SET "price_key" = '${DEFAULT_PRICE_KEY}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order_item" DROP COLUMN "selected_notes"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."order_item" DROP COLUMN "variant_label"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "option_notes"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "variant_label"`);
    await queryRunner.query(`ALTER TABLE "${DB_SCHEMA}"."dish" DROP COLUMN "base_name"`);
  }
}
