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
  DATABASE_URL,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA,
  DB_SSL,
  DB_USER,
  MIGRATIONS_PATH = '',
  WORKSPACE,
} = process.env;

/**
 * ספקי Postgres מנוהלים (Neon / Railway / Supabase / Render) דורשים SSL,
 * ולרוב עם תעודה שאינה ניתנת לאימות מלא — ולכן `rejectUnauthorized: false`.
 * מופעל דרך `DB_SSL=true` כדי שסביבת פיתוח מקומית תמשיך לעבוד ללא SSL.
 */
const ssl = DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined;

/**
 * המיגרציות נשארות כקובצי `.ts` ומורצות דרך ה-CLI (`npm run migration:run`),
 * ולכן אין לטעון אותן בשרת המהודר — Node אינו יודע לפרש `.ts` והטעינה תקרוס.
 * בייצור אין צורך בהן כלל, שכן הן מורצות מראש מול מסד הנתונים.
 */
const IS_COMPILED = __filename.endsWith('.js');

const migrations = IS_COMPILED ? [] : [`${MIGRATIONS_PATH || ''}migrations/*.ts`];

/** נתונים משותפים לשני אופני החיבור (מחרוזת יחידה או שדות נפרדים). */
const sharedOptions = {
  entities: [Category, Costumer, Dish, Hospitality, Order, OrderItem, Reservation, AdminUser],
  logging: WORKSPACE === 'local',
  migrations,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each' as const,
  namingStrategy: new SnakeNamingStrategy(),
  schema: DB_SCHEMA,
  synchronize: false,
  type: 'postgres' as const,
  ssl,
};

/**
 * רוב ספקי הענן מספקים `DATABASE_URL` יחיד; בפיתוח מקומי משתמשים בשדות נפרדים.
 */
const options: DataSourceOptions = DATABASE_URL
  ? { ...sharedOptions, url: DATABASE_URL }
  : {
      ...sharedOptions,
      database: DATABASE,
      host: DB_HOST,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
      username: DB_USER,
    };

export const AppDataSource = new DataSource(options);

export const connectToDb = () => AppDataSource.initialize();
