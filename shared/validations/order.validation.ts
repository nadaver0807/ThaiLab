import { z } from 'zod';
import { OrderType } from '@shared/enums/order-type.enum';
import { PaymentMethod } from '@shared/enums/payment-method.enum';
import {
  email,
  enumValue,
  israeliPhone,
  limitedString,
  optionalString,
} from '@shared/validations/common.validation';

export const orderItemSchema = z.object({
  dishUuid: z.string().uuid(),
  priceKey: limitedString(1, 60),
  quantity: z.coerce.number().int().min(1).max(50),
  specialRequest: optionalString(300),
});

export const customerDetailsSchema = z.object({
  firstName: limitedString(2, 40),
  lastName: optionalString(40),
  phone: israeliPhone(),
  email: email(),
});

export const createOrderSchema = z
  .object({
    type: enumValue(OrderType),
    paymentMethod: enumValue(PaymentMethod).default(PaymentMethod.OnCollection),
    customer: customerDetailsSchema,
    address: optionalString(200),
    notes: optionalString(500),
    items: z.array(orderItemSchema).min(1, 'העגלה ריקה'),
  })
  .refine((order) => order.type !== OrderType.Delivery || Boolean(order.address?.trim()), {
    message: 'כתובת נדרשת עבור משלוח',
    path: ['address'],
  });

export const customerLookupSchema = z.object({
  phone: israeliPhone(),
});

export const checkoutFormSchema = z
  .object({
    type: enumValue(OrderType),
    firstName: limitedString(2, 40),
    lastName: optionalString(40),
    phone: israeliPhone(),
    email: email(),
    address: optionalString(200),
    notes: optionalString(500),
  })
  .refine((form) => form.type !== OrderType.Delivery || Boolean(form.address?.trim()), {
    message: 'כתובת נדרשת עבור משלוח',
    path: ['address'],
  });

export type CheckoutForm = z.infer<typeof checkoutFormSchema>;

export type OrderItemPayload = z.infer<typeof orderItemSchema>;

export type CustomerDetailsPayload = z.infer<typeof customerDetailsSchema>;

export type CreateOrderPayload = z.infer<typeof createOrderSchema>;

export type CustomerLookupPayload = z.infer<typeof customerLookupSchema>;
