import { type ContactForm } from '@thailab/shared';

export type ContactMessage = ContactForm & {
  id: string;
  createdAt: Date;
};
