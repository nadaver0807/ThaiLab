import { z } from 'zod';

export const limitedString = (min: number, max: number) => z.string().trim().min(min).max(max);

export const requiredString = (max = 255) => limitedString(1, max);

export const optionalString = (max = 255) =>
  z.string().trim().max(max).optional().or(z.literal(''));

export const israeliPhone = () =>
  z
    .string()
    .trim()
    .regex(/^0\d{1,2}-?\d{7}$/, 'מספר טלפון אינו תקין');

export const email = () => z.string().trim().email('כתובת אימייל אינה תקינה');

export const enumValue = <T extends Record<string, string>>(enumObject: T) =>
  z.nativeEnum(enumObject);

export const positiveNumber = () => z.coerce.number().positive();
