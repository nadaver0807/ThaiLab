import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'יש להזין אימייל').email('כתובת אימייל אינה תקינה'),
  password: z.string().min(1, 'יש להזין סיסמה'),
});

export type LoginPayload = z.infer<typeof loginSchema>;
