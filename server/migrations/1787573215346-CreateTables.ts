import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1787573215346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "thailab"."dish_spice_level_enum" AS ENUM('NONE', 'MILD', 'MEDIUM', 'HOT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "thailab"."dish" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "image_url" character varying NOT NULL, "spice_level" "thailab"."dish_spice_level_enum" NOT NULL DEFAULT 'NONE', "is_available" boolean NOT NULL DEFAULT true, "stock" integer NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "category_uuid" uuid, CONSTRAINT "PK_3badb9ce39f7a2529ddf75d1132" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "thailab"."category" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "display_order" integer NOT NULL DEFAULT '0', "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, CONSTRAINT "PK_86ee096735ccbfa3fd319af1833" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "thailab"."hospitality_type_enum" AS ENUM('PRIVATE_EVENT', 'CORPORATE', 'WEDDING', 'COOKING_CLASS', 'CATERING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "thailab"."hospitality_status_enum" AS ENUM('REQUESTED', 'QUOTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "thailab"."hospitality" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "thailab"."hospitality_type_enum" NOT NULL, "status" "thailab"."hospitality_status_enum" NOT NULL DEFAULT 'REQUESTED', "event_date" TIMESTAMP NOT NULL, "guest_count" integer NOT NULL, "location" character varying, "quoted_price" integer, "notes" character varying, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "costumer_uuid" uuid, CONSTRAINT "PK_b433915ef6a38a958da35bbcc6e" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "thailab"."order_item" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unit_price" integer NOT NULL, "special_request" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "order_uuid" uuid, "dish_uuid" uuid, CONSTRAINT "PK_8240c9a4e6f95be0888aebe3ce2" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "thailab"."order_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "thailab"."order_type_enum" AS ENUM('Pickup', 'Delivery')`,
    );
    await queryRunner.query(
      `CREATE TABLE "thailab"."order" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "thailab"."order_status_enum" NOT NULL DEFAULT 'PENDING', "total_price" integer NOT NULL DEFAULT '0', "notes" character varying, "type" "thailab"."order_type_enum" NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "costumer_uuid" uuid, CONSTRAINT "PK_ba94d4066f76b66d3fe0b94c283" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "thailab"."reservation_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "thailab"."reservation" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "reserved_at" TIMESTAMP NOT NULL, "party_size" integer NOT NULL, "status" "thailab"."reservation_status_enum" NOT NULL DEFAULT 'PENDING', "notes" character varying, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "costumer_uuid" uuid, CONSTRAINT "PK_e78a5f9d802330e3f102c10369d" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "thailab"."costumer" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, CONSTRAINT "UQ_6895c60f60b942a7e7efe02a2b2" UNIQUE ("email"), CONSTRAINT "PK_cea0666280262327004a9fe61bf" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."dish" ADD CONSTRAINT "FK_a12797e17027d3af66141e63ac8" FOREIGN KEY ("category_uuid") REFERENCES "thailab"."category"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."hospitality" ADD CONSTRAINT "FK_d1e55056b3ed30f8a115b7a4eca" FOREIGN KEY ("costumer_uuid") REFERENCES "thailab"."costumer"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."order_item" ADD CONSTRAINT "FK_9db30e84a772fd7d94616556e20" FOREIGN KEY ("order_uuid") REFERENCES "thailab"."order"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."order_item" ADD CONSTRAINT "FK_6047c7df4e1955d5af3def433ad" FOREIGN KEY ("dish_uuid") REFERENCES "thailab"."dish"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."order" ADD CONSTRAINT "FK_9e5d1c319e70f5cbba73c286419" FOREIGN KEY ("costumer_uuid") REFERENCES "thailab"."costumer"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."reservation" ADD CONSTRAINT "FK_4388722a73e94ba6ec82ca8ae2b" FOREIGN KEY ("costumer_uuid") REFERENCES "thailab"."costumer"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "thailab"."reservation" DROP CONSTRAINT "FK_4388722a73e94ba6ec82ca8ae2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."order" DROP CONSTRAINT "FK_9e5d1c319e70f5cbba73c286419"`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."order_item" DROP CONSTRAINT "FK_6047c7df4e1955d5af3def433ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."order_item" DROP CONSTRAINT "FK_9db30e84a772fd7d94616556e20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."hospitality" DROP CONSTRAINT "FK_d1e55056b3ed30f8a115b7a4eca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "thailab"."dish" DROP CONSTRAINT "FK_a12797e17027d3af66141e63ac8"`,
    );
    await queryRunner.query(`DROP TABLE "thailab"."costumer"`);
    await queryRunner.query(`DROP TABLE "thailab"."reservation"`);
    await queryRunner.query(`DROP TYPE "thailab"."reservation_status_enum"`);
    await queryRunner.query(`DROP TABLE "thailab"."order"`);
    await queryRunner.query(`DROP TYPE "thailab"."order_type_enum"`);
    await queryRunner.query(`DROP TYPE "thailab"."order_status_enum"`);
    await queryRunner.query(`DROP TABLE "thailab"."order_item"`);
    await queryRunner.query(`DROP TABLE "thailab"."hospitality"`);
    await queryRunner.query(`DROP TYPE "thailab"."hospitality_status_enum"`);
    await queryRunner.query(`DROP TYPE "thailab"."hospitality_type_enum"`);
    await queryRunner.query(`DROP TABLE "thailab"."category"`);
    await queryRunner.query(`DROP TABLE "thailab"."dish"`);
    await queryRunner.query(`DROP TYPE "thailab"."dish_spice_level_enum"`);
  }
}
