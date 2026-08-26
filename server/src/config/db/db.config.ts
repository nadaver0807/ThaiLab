import { Category } from '@/category/Category.entity';
import { Costumer } from '@/costumer/Costumer.entity';
import { Dish } from '@/dish/Dish.entity';
import { Hospitality } from '@/hospitality/Hospitality.entity';
import { Order } from '@/order/Order.entity';
import { OrderItem } from '@/order-item/OrderItem.entity';
import { Reservation } from '@/reservation/Reservation.entity';
import dotEnv from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';
dotEnv.config();
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AdminUser } from '@/admin-user/AdminUser.entity';

const {
  DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA,
  DB_USER,
  MIGRATIONS_PATH = '',
  WORKSPACE,
} = process.env;

const options: DataSourceOptions = {
  database: DATABASE,
  entities: [Category, Costumer, Dish, Hospitality, Order, OrderItem, Reservation, AdminUser],
  host: DB_HOST,
  logging: WORKSPACE === 'local',
  migrations: [`${MIGRATIONS_PATH || ''}migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each',
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  schema: DB_SCHEMA,
  type: 'postgres',
  username: DB_USER,
};

export const AppDataSource = new DataSource(options);

export const connectToDb = () => AppDataSource.initialize();
