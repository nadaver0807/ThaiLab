'use client';

import { useMutation } from '@tanstack/react-query';
import { type ContactMessageForm } from '@shared/validations/contact.validation';
import { type SendEmailPayload } from '@shared/validations/email.validation';
import Api from './api.util';

export const USE_SEND_EMAIL_KEY = 'useSendEmail';

export const sendEmail = async (body: SendEmailPayload): Promise<void> => {
  await Api.post('/send-email', body);
};

export const sendContactEmail = async (form: ContactMessageForm): Promise<void> => {
  await sendEmail({
    subject: `הודעה חדשה מטופס יצירת קשר — ${form.fullName}`,
    fromName: form.fullName,
    replyTo: form.email,
    payload: { שם: form.fullName, אימייל: form.email, הודעה: form.message },
  });
};

const useSendEmail = () =>
  useMutation({
    mutationKey: [USE_SEND_EMAIL_KEY],
    mutationFn: sendContactEmail,
  });

export default useSendEmail;
