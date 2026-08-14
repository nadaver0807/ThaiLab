import { randomUUID } from 'node:crypto';
import { type ContactForm } from '@thailab/shared';
import { type ContactMessage } from './ContactMessage.entity';

const messages: ContactMessage[] = [];

export const save = async (form: ContactForm): Promise<ContactMessage> => {
  const message: ContactMessage = {
    ...form,
    fullName: form.fullName.trim(),
    phone: form.phone.replace('-', ''),
    email: form.email.toLowerCase(),
    id: randomUUID(),
    createdAt: new Date(),
  };

  messages.push(message);

  return message;
};
