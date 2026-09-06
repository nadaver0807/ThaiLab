import { z } from 'zod';
import {
  email,
  enumValue,
  limitedString,
  optionalString,
} from '@shared/validations/common.validation';
import { ServiceType } from '@shared/enums/service-type.enum';

export const createReviewSchema = z.object({
  authorName: limitedString(2, 60),
  /** לא מוצג באתר — משמש רק כדי שעופר יוכל לחזור ללקוח */
  authorEmail: email(),
  serviceType: enumValue(ServiceType),
  rating: z.coerce.number().int().min(1).max(5),
  content: limitedString(10, 1000),
  title: optionalString(80),
  /** מזהה ההזמנה מהקישור במייל — רק לקוח שהזמין יכול לכתוב ביקורת */
  orderUuid: z.string().uuid(),
});

export type CreateReviewPayload = z.infer<typeof createReviewSchema>;
