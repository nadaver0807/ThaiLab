'use client';

import { useMutation } from '@tanstack/react-query';
import { type ContactForm } from '@shared/validations/contact.validation';
import { request } from './api.util';

export const USE_SAVE_CONTACT_MESSAGE_KEY = 'useSaveContactMessage';

export const saveContactMessage = async (form: ContactForm): Promise<void> => {
  await request<void>('/contact', { method: 'POST', body: JSON.stringify(form) });
};

const useSaveContactMessage = () =>
  useMutation({
    mutationKey: [USE_SAVE_CONTACT_MESSAGE_KEY],
    mutationFn: saveContactMessage,
  });

export default useSaveContactMessage;
