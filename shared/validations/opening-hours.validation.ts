import { z } from 'zod';

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const timeSchema = z.string().regex(TIME_PATTERN, 'שעה חייבת להיות בפורמט HH:MM');

const openingHoursDaySchema = z
  .object({
    day: z.number().int().min(0).max(6),
    isOpen: z.boolean(),
    open: timeSchema,
    close: timeSchema,
  })
  .refine((day) => !day.isOpen || toMinutes(day.close) > toMinutes(day.open), {
    message: 'שעת הסגירה חייבת להיות אחרי שעת הפתיחה',
    path: ['close'],
  });

export const updateOpeningHoursSchema = z.object({
  days: z
    .array(openingHoursDaySchema)
    .length(7, 'יש לשלוח את כל ימי השבוע')
    .refine((days) => new Set(days.map((day) => day.day)).size === 7, {
      message: 'כל יום יכול להופיע פעם אחת בלבד',
    }),
});

export type UpdateOpeningHoursPayload = z.infer<typeof updateOpeningHoursSchema>;
