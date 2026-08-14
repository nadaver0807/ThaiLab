import { z } from 'zod';
import {
  email,
  israeliPhone,
  limitedString,
  requiredString,
} from './common.validation';

export const contactSchema = z.object({
  fullName: limitedString(2, 60),
  phone: israeliPhone(),
  email: email(),
  message: limitedString(5, 1000),
});

export const reservationSchema = z.object({
  fullName: limitedString(2, 60),
  phone: israeliPhone(),
  date: requiredString(30),
  guests: z.coerce.number().int().min(1).max(30),
  notes: limitedString(0, 500).optional(),
});

export type ContactForm = z.infer<typeof contactSchema>;

export type ReservationForm = z.infer<typeof reservationSchema>;
