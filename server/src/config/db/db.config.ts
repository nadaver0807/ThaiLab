import { Dish } from "@/dish/Dish.entity";
import dotEnv from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";
dotEnv.config();
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const {
  DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA,
  DB_USER,
  MIGRATIONS_PATH = "",
  WORKSPACE,
} = process.env;

const options: DataSourceOptions = {
  database: DATABASE,
  entities: [Dish],
  host: DB_HOST,
  logging: WORKSPACE === "local",
  migrations: [`${MIGRATIONS_PATH ?? ""}migrations/*`],
  migrationsTransactionMode: "each",
  namingStrategy: new SnakeNamingStrategy(),
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  schema: DB_SCHEMA,
  type: "postgres",
  username: DB_USER,
};

export const AppDataSource = new DataSource(options);

export const connectToDb = AppDataSource.initialize();
