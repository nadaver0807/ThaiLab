import dotEnv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotEnv.config();

const { DB_SCHEMA } = process.env;

type DishRow = {
  uuid: string;
  name: string;
  price_options: Record<string, number>;
  display_order: number;
};

export class MergeSplitDishes1788450000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dishes: DishRow[] = await queryRunner.query(
      `SELECT "uuid", "name", "price_options", "display_order"
       FROM "${DB_SCHEMA}"."dish"
       WHERE "delete_date" IS NULL AND "name" LIKE '%—%'
       ORDER BY "display_order"`,
    );
    const groups = new Map<string, DishRow[]>();

    for (const dish of dishes) {
      const baseName = dish.name.split('—')[0].trim();
      groups.set(baseName, [...(groups.get(baseName) ?? []), dish]);
    }

    for (const [baseName, variants] of groups) {
      const priceOptions: Record<string, number> = {};

      for (const variant of variants) {
        const label = variant.name.split('—').slice(1).join('—').trim();
        const price = Object.values(variant.price_options ?? {})[0] ?? 0;

        for (const option of label.split('/').map((part) => part.trim())) {
          if (option) {
            priceOptions[option] = price;
          }
        }
      }
      const [keeper, ...duplicates] = variants;

      await queryRunner.query(
        `UPDATE "${DB_SCHEMA}"."dish"
         SET "name" = $1, "price_options" = $2::jsonb, "display_order" = $3
         WHERE "uuid" = $4`,
        [
          baseName,
          JSON.stringify(priceOptions),
          Math.floor(keeper.display_order / 100),
          keeper.uuid,
        ],
      );
      for (const duplicate of duplicates) {
        await queryRunner.query(
          `UPDATE "${DB_SCHEMA}"."order_item" SET "dish_uuid" = $1 WHERE "dish_uuid" = $2`,
          [keeper.uuid, duplicate.uuid],
        );
        await queryRunner.query(`DELETE FROM "${DB_SCHEMA}"."dish" WHERE "uuid" = $1`, [
          duplicate.uuid,
        ]);
      }
    }
    await queryRunner.query(
      `UPDATE "${DB_SCHEMA}"."dish"
       SET "delete_date" = now()
       WHERE "delete_date" IS NULL AND "name" = 'עוף / טופו בקשיו'`,
    );
  }

  public async down(): Promise<void> {
    // איחוד המנות אינו הפיך — הפיצול היה באג ואין טעם לשחזר אותו.
  }
}
