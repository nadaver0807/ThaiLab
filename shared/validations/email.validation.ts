import { z } from 'zod';
import { email, limitedString } from '@shared/validations/common.validation';

export const sendEmailSchema = z.object({
  subject: limitedString(2, 200),
  fromName: limitedString(1, 60).optional(),
  replyTo: email().optional(),
  payload: z.record(z.unknown()),
});

export type SendEmailPayload = z.infer<typeof sendEmailSchema>;
