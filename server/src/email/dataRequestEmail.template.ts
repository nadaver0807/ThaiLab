import { DataRequestTypeLabel } from '@shared/enums/data-request-type.enum';
import { type DataRequestForm } from '@shared/validations/dataRequest.validation';
import { escapeHtml } from '@/email/orderEmail.template';

const FONT = 'font-family:Arial,Helvetica,sans-serif;';

/** מייל לבעל העסק על בקשה בנושא מידע אישי. כל קלט מהמשתמש עובר escape. */
export const renderDataRequestEmail = (form: DataRequestForm): string => {
  const rows: Array<[string, string]> = [
    ['סוג הבקשה', DataRequestTypeLabel[form.type]],
    ['שם', form.fullName],
    ['טלפון', form.phone],
    ['אימייל', form.email],
    ['פרטים נוספים', form.details || '—'],
  ];

  const body = rows
    .map(
      ([label, value]) => `<tr>
        <td style="padding:6px 10px;border:1px solid #ddd;font-weight:700;">${label}</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join('');

  return `<div dir="rtl" style="${FONT}font-size:14px;color:#222;">
    <h2>בקשה חדשה בנושא מידע אישי</h2>
    <table style="border-collapse:collapse;">${body}</table>
    <p style="color:#777;font-size:12px;">
      יש לאמת את זהות הפונה לפני מסירה, תיקון או מחיקה של מידע, ולהשיב תוך 30 יום.
      מידע שהדין מחייב לשמור (למשל רישומי הזמנות) אינו נמחק.
    </p>
  </div>`;
};
