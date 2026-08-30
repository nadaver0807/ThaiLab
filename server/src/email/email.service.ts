import { Resend } from 'resend';
import { type SendEmailPayload } from '@shared/validations/email.validation';
import { ADMIN_EMAIL, EMAIL_FROM, RESEND_API_KEY } from '../server.const';

let client: Resend | null = null;

const getClient = (): Resend => {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  if (!client) {
    client = new Resend(RESEND_API_KEY);
  }

  return client;
};

const renderPayload = (payload: Record<string, unknown>): string => {
  const rows = Object.entries(payload)
    .map(([key, value]) => {
      const text = typeof value === 'string' ? value : JSON.stringify(value);
      const safe = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br />');

      return `<tr>
        <td style="padding:8px 12px;border:1px solid #ddd;font-weight:700;">${key}</td>
        <td style="padding:8px 12px;border:1px solid #ddd;">${safe}</td>
      </tr>`;
    })
    .join('');

  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    <tbody>${rows}</tbody>
  </table>`;
};

const buildFrom = (fromName?: string): string => {
  if (!fromName) {
    return EMAIL_FROM;
  }

  const match = EMAIL_FROM.match(/^\s*(.*?)\s*<(.+)>\s*$/);
  const address = match ? match[2] : EMAIL_FROM.trim();
  const siteName = match?.[1] || 'ThaiLab';

  const safeName = fromName.replace(/[<>"\r\n]/g, '').trim();

  return `${safeName} via ${siteName} <${address}>`;
};

export const sendEmail = async ({
  subject,
  fromName,
  replyTo,
  payload,
}: SendEmailPayload): Promise<void> => {
  const client = getClient();
  const { error } = await client.emails.send({
    from: buildFrom(fromName),
    to: ADMIN_EMAIL,
    subject,
    html: renderPayload(payload as Record<string, unknown>),
    replyTo: replyTo ?? ADMIN_EMAIL,
  });

  if (error) {
    throw new Error(error.message);
  }
};

type SendHtmlEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/** שליחת מייל בגוף HTML מוכן — משמש להודעות ההזמנות. */
export const sendHtmlEmail = async ({
  to,
  subject,
  html,
  replyTo,
}: SendHtmlEmailParams): Promise<void> => {
  const client = getClient();
  const { error } = await client.emails.send({
    from: EMAIL_FROM,
    to,
    subject,
    html,
    replyTo: replyTo ?? ADMIN_EMAIL,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export default { sendEmail, sendHtmlEmail };
