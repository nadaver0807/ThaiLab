import { type ContactForm } from '@shared/validations/contact.validation';

export type ContactMessage = ContactForm & {
  id: string;
  createdAt: Date;
};
