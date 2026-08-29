import { ILike } from 'typeorm';

import { AppDataSource } from '@/config/db/db.config';
import { AdminUser } from '@/admin-user/AdminUser.entity';
import { createSessionToken } from '@/util/sessionToken.util';
import { verifyPassword } from '@/util/password.util';

const AdminUserRepository = AppDataSource.getRepository(AdminUser);

const escapeLikePattern = (value: string): string => value.replace(/[\\%_]/g, '\\$&');

/**
 * בודק אם האימייל רשום בטבלת המנהלים. ההשוואה case-insensitive.
 */
export const isAdminEmail = async (email: string | null): Promise<boolean> => {
  if (!email) {
    return false;
  }

  return AppDataSource.getRepository(AdminUser).existsBy({
    email: ILike(escapeLikePattern(email.trim())),
  });
};

export const authenticateAdmin = async (
  email: string,
  password: string,
): Promise<{ email: string; token: string } | null> => {
  const adminUser = await AdminUserRepository.findOne({
    where: { email: ILike(escapeLikePattern(email.trim())) },
    select: { uuid: true, email: true, passwordHash: true },
  });

  if (!adminUser) {
    return null;
  }

  const isPasswordValid = await verifyPassword(password, adminUser.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  return { email: adminUser.email, token: createSessionToken(adminUser.email) };
};
