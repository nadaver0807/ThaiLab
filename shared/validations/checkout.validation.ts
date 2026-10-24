import { z } from 'zod';
import {
  email,
  israeliPhone,
  limitedString,
  optionalString,
  positiveNumber,
} from '@shared/validations/common.validation';

/** פריט בודד בעגלה כפי שהוא נשלח ליצירת קישור תשלום. */
export const paymentLinkItemSchema = z.object({
  dishUuid: z.string().uuid().optional(),
  name: limitedString(1, 120),
  quantity: z.coerce.number().int().min(1).max(50),
  unitPrice: positiveNumber(),
});

export const paymentLinkCustomerSchema = z.object({
  name: limitedString(2, 80),
  email: email(),
  phone: israeliPhone(),
});

export const createPaymentLinkSchema = z.object({
  orderId: limitedString(1, 100),
  amount: positiveNumber(),
  customer: paymentLinkCustomerSchema,
  items: z.array(paymentLinkItemSchema).min(1, 'העגלה ריקה'),
  notes: optionalString(500),
});

export type PaymentLinkItemPayload = z.infer<typeof paymentLinkItemSchema>;

export type PaymentLinkCustomerPayload = z.infer<typeof paymentLinkCustomerSchema>;

export type CreatePaymentLinkPayload = z.infer<typeof createPaymentLinkSchema>;
