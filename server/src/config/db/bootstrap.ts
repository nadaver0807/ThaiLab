import 'reflect-metadata';
import dotEnv from 'dotenv';

dotEnv.config();

import { AppDataSource } from '@/config/db/db.config';

/**
 * מכין מסד נתונים חדש להרצת המיגרציות: יוצר את הסכימה ואת ההרחבה `uuid-ossp`.
 * המיגרציה הראשונה מניחה ששניהם קיימים, ובמסד ענן חדש הם אינם.
 * הפעולה אידמפוטנטית וניתן להריץ אותה שוב ושוב בבטחה.
 */
const bootstrap = async (): Promise<void> => {
  const schema = process.env.DB_SCHEMA;

  if (!schema) {
    throw new Error('DB_SCHEMA is required');
  }

  // חיבור ללא סכימה — הסכימה עדיין לא קיימת בשלב זה.
  const dataSource = await AppDataSource.setOptions({ schema: undefined }).initialize();

  try {
    await dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
    await dataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.info(`הסכימה "${schema}" וההרחבה uuid-ossp מוכנות.`);
  } finally {
    await dataSource.destroy();
  }
};

bootstrap().catch((error: unknown) => {
  console.error('הכנת מסד הנתונים נכשלה:', error);
  process.exit(1);
});
