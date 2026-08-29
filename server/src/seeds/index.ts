import 'reflect-metadata';
import dotEnv from 'dotenv';

dotEnv.config();

import { AppDataSource } from '@/config/db/db.config';
import { AdminUser } from '@/admin-user/AdminUser.entity';
import { Dish } from '@/dish/Dish.entity';
import { DISH_SEEDS } from '@/seeds/dish.seed';
import { hashPassword } from '@/util/password.util';

const MIN_PASSWORD_LENGTH = 8;

/** אורך מומלץ לייצור — קצר מכך מפיק אזהרה אך אינו חוסם. */
const RECOMMENDED_PASSWORD_LENGTH = 12;

/**
 * מזריע את מנות התפריט. הפעולה אידמפוטנטית — מנה קיימת (לפי שם) מתעדכנת
 * במקום להיווצר מחדש, כך שאפשר להריץ את הסקריפט שוב ושוב בבטחה.
 */
const seedDishes = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(Dish);

  for (const seed of DISH_SEEDS) {
    const existing = await repository.findOne({ where: { name: seed.name } });

    if (existing) {
      repository.merge(existing, seed);
      await repository.save(existing);
      console.info(`עודכן: ${seed.name}`);

      continue;
    }

    await repository.save(repository.create(seed));
    console.info(`נוצר: ${seed.name}`);
  }
};

/**
 * מזריע מנהלים מתוך `SEED_ADMIN_USERS` בפורמט `email:password`, מופרדים בפסיקים.
 * הסיסמאות מגובבות לפני השמירה — לעולם לא נשמר טקסט גלוי.
 */
const seedAdminUsers = async (): Promise<void> => {
  const entries = (process.env.SEED_ADMIN_USERS ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const separatorIndex = entry.indexOf(':');

      if (separatorIndex === -1) {
        throw new Error(`SEED_ADMIN_USERS: פורמט שגוי ב-"${entry}". נדרש email:password`);
      }

      return {
        email: entry.slice(0, separatorIndex).trim().toLowerCase(),
        password: entry.slice(separatorIndex + 1).trim(),
      };
    });

  if (!entries.length) {
    console.info('לא הוגדר SEED_ADMIN_USERS — דילוג על הזרעת מנהלים.');

    return;
  }

  const repository = AppDataSource.getRepository(AdminUser);

  for (const { email, password } of entries) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`הסיסמה עבור ${email} קצרה מ-${MIN_PASSWORD_LENGTH} תווים.`);
    }

    // סיסמה קצרה עוברת, אך פאנל הניהול חשוף לאינטרנט — לכן אזהרה מפורשת.
    if (password.length < RECOMMENDED_PASSWORD_LENGTH) {
      console.warn(
        `⚠️  הסיסמה עבור ${email} באורך ${password.length} תווים בלבד. ` +
          `מומלץ לפחות ${RECOMMENDED_PASSWORD_LENGTH} תווים בייצור.`,
      );
    }

    const passwordHash = await hashPassword(password);

    const existing = await repository
      .createQueryBuilder('adminUser')
      .where('LOWER(adminUser.email) = :email', { email })
      .getOne();

    if (existing) {
      // הרצה חוזרת מעדכנת את הסיסמה — כך אפשר לאפס סיסמה שנשכחה.
      existing.passwordHash = passwordHash;
      await repository.save(existing);
      console.info(`עודכנה סיסמת מנהל: ${email}`);

      continue;
    }

    await repository.save(repository.create({ email, passwordHash }));
    console.info(`נוצר מנהל: ${email}`);
  }
};

const run = async (): Promise<void> => {
  await AppDataSource.initialize();

  try {
    await seedDishes();
    await seedAdminUsers();
    console.info('ההזרעה הושלמה בהצלחה.');
  } finally {
    await AppDataSource.destroy();
  }
};

run().catch((error: unknown) => {
  console.error('ההזרעה נכשלה:', error);
  process.exit(1);
});
