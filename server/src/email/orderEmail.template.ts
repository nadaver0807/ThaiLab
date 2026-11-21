import { OrderTypeLabel } from '@shared/enums/order-type.enum';
import { Route } from '@shared/enums/route.enum';
import { SITE } from '@shared/consts/site.const';
import { type OrderSummary } from '@shared/types/order.type';
import { getLegalIdentity } from '@shared/util/business.util';
import { CLIENT_ORIGIN } from '@/server.const';

const FONT = 'font-family:Arial,Helvetica,sans-serif;';

/** מנטרל תווי HTML כדי שקלט מהלקוח לא יישתל בגוף המייל. */
export const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const renderItems = (order: OrderSummary): string =>
  order.items
    .map((item) => {
      // הווריאציה מוצגת תמיד — גם כשהמחיר זהה חייבים לדעת מה בדיוק הוזמן
      const variant = item.variantLabel
        ? `<div style="font-weight:700;color:#B08D57;">${escapeHtml(item.variantLabel)}</div>`
        : '';

      const notes = item.selectedNotes?.length
        ? `<div style="color:#555;font-size:13px;">• ${item.selectedNotes
            .map(escapeHtml)
            .join('<br />• ')}</div>`
        : '';

      const request = item.specialRequest
        ? `<div style="color:#555;font-size:13px;font-style:italic;">${escapeHtml(item.specialRequest)}</div>`
        : '';

      return `<tr>
        <td style="padding:6px 10px;border:1px solid #ddd;">
          ${item.quantity} × ${escapeHtml(item.dishName)}
          ${variant}
          ${notes}
          ${request}
        </td>
        <td style="padding:6px 10px;border:1px solid #ddd;white-space:nowrap;">₪${item.unitPrice * item.quantity}</td>
      </tr>`;
    })
    .join('');

const renderTotals = (order: OrderSummary): string => {
  const deliveryRow =
    order.deliveryFee > 0
      ? `<tr><td style="padding:6px 10px;">דמי משלוח</td><td style="padding:6px 10px;">₪${order.deliveryFee}</td></tr>`
      : '';

  return `<table style="border-collapse:collapse;${FONT}font-size:14px;margin-top:8px;">
    <tr><td style="padding:6px 10px;">סכום ביניים</td><td style="padding:6px 10px;">₪${order.subtotal}</td></tr>
    ${deliveryRow}
    <tr><td style="padding:6px 10px;font-weight:700;">סה״כ לתשלום</td><td style="padding:6px 10px;font-weight:700;">₪${order.totalPrice}</td></tr>
  </table>`;
};

const renderDetails = (order: OrderSummary): string => {
  const rows: Array<[string, string]> = [
    ['לקוח', order.contactName],
    ['טלפון', order.contactPhone],
    ['אימייל', order.contactEmail],
    ['סוג הזמנה', OrderTypeLabel[order.type]],
  ];

  if (order.address) {
    rows.push(['כתובת', order.address]);
  }

  if (order.notes) {
    rows.push(['הערות', order.notes]);
  }

  return rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:6px 10px;border:1px solid #ddd;font-weight:700;">${label}</td>
          <td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');
};

const button = (href: string, label: string, color: string): string =>
  `<a href="${href}" style="display:inline-block;padding:12px 24px;margin-left:8px;border-radius:6px;background:${color};color:#fff;text-decoration:none;font-weight:700;${FONT}">${label}</a>`;

/** מייל למנהל — פרטי ההזמנה ושני כפתורי החלטה. */
export const renderAdminOrderEmail = (
  order: OrderSummary,
  confirmUrl: string,
  rejectUrl: string,
): string => `<div dir="rtl" style="${FONT}font-size:14px;color:#222;">
  <h2>הזמנה חדשה — ${escapeHtml(order.contactName)}</h2>

  <table style="border-collapse:collapse;">${renderDetails(order)}</table>

  <h3>המנות</h3>
  <table style="border-collapse:collapse;">${renderItems(order)}</table>

  ${renderTotals(order)}

  <p style="margin-top:24px;">
    ${button(confirmUrl, 'אישור ההזמנה', '#2e7d32')}
    ${button(rejectUrl, 'דחיית ההזמנה', '#c62828')}
  </p>

  <p style="color:#777;font-size:12px;">לחיצה על אחד הכפתורים תשלח ללקוח הודעה אוטומטית.</p>
</div>`;

/** השדות הנדרשים למייל "התקבל תשלום" — מתאים גם לישות Order וגם ל-OrderSummary. */
export type PaidOrderDetails = Pick<
  OrderSummary,
  'uuid' | 'contactName' | 'contactPhone' | 'contactEmail' | 'totalPrice' | 'address'
> & { paymentReference?: string | null };

/** מייל למנהל — התשלום אומת מול ספק הסליקה, אפשר להתחיל להכין. */
export const renderAdminPaymentEmail = (order: PaidOrderDetails): string => {
  const rows: Array<[string, string]> = [
    ['לקוח', order.contactName],
    ['טלפון', order.contactPhone],
    ['סכום ששולם', `₪${order.totalPrice}`],
    ['מספר אסמכתא', order.uuid.slice(0, 8).toUpperCase()],
  ];

  if (order.address) {
    rows.push(['כתובת', order.address]);
  }

  if (order.paymentReference) {
    rows.push(['מזהה עסקה', order.paymentReference]);
  }

  return `<div dir="rtl" style="${FONT}font-size:14px;color:#222;">
    <h2 style="color:#2e7d32;">התקבל תשלום — ${escapeHtml(order.contactName)}</h2>
    <p>התשלום אומת מול חברת הסליקה. אפשר להתחיל להכין את ההזמנה.</p>
    <table style="border-collapse:collapse;">${rows
      .map(
        ([label, value]) =>
          `<tr>
            <td style="padding:6px 10px;border:1px solid #ddd;font-weight:700;">${label}</td>
            <td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(value)}</td>
          </tr>`,
      )
      .join('')}</table>
  </div>`;
};

/** פרטי העסק, הסבר על סיבת המייל וקישור להסרה / מחיקת פרטים — מופיע בכל מייל ללקוח. */
const renderCustomerFooter = (): string => {
  const origin = CLIENT_ORIGIN.replace(/\/$/, '');
  const identity = getLegalIdentity();

  return `<div style="margin-top:28px;padding-top:16px;border-top:1px solid #ddd;color:#777;font-size:12px;${FONT}">
    <p style="margin:0 0 6px;">
      קיבלתם הודעה זו כי ביצעתם הזמנה באתר ${escapeHtml(SITE.name)}. זו הודעת שירות בלבד — איננו שולחים דיוור שיווקי.
    </p>
    <p style="margin:0 0 6px;">
      לא מעוניינים לקבל מאיתנו עוד הודעות, או רוצים למחוק את הפרטים שלכם?
      <a href="${origin}${Route.DataRequest}" style="color:#725528;">אפשר להגיש בקשה כאן</a>.
    </p>
    <p style="margin:0;">
      ${identity ? `${escapeHtml(identity)} · ` : ''}${escapeHtml(SITE.address)} · ${escapeHtml(SITE.phone)} · ${escapeHtml(SITE.email)}
    </p>
  </div>`;
};

/** מייל ללקוח לאחר החלטת המנהל. כשיש paymentUrl — ההזמנה ממתינה לתשלום באשראי. */
export const renderCustomerDecisionEmail = (
  order: OrderSummary,
  isConfirmed: boolean,
  reviewUrl?: string,
  paymentUrl?: string,
): string => {
  const headline = isConfirmed ? 'ההזמנה שלכם אושרה!' : 'ההזמנה שלכם לא אושרה';

  const deliveryText = order.address
    ? `המשלוח יגיע לכתובת ${escapeHtml(order.address)}.`
    : 'נעדכן אתכם כשההזמנה תהיה מוכנה לאיסוף.';

  const body = !isConfirmed
    ? 'לצערנו לא נוכל להכין את ההזמנה הפעם. נשמח לעמוד לרשותכם בטלפון לפרטים נוספים.'
    : paymentUrl
      ? `כדי להשלים את ההזמנה יש לשלם ₪${order.totalPrice} בקישור שלמטה. ${deliveryText}`
      : `אנחנו מתחילים להכין. ${deliveryText} התשלום מתבצע במזומן בלבד, במקום.`;

  const paymentSection =
    isConfirmed && paymentUrl
      ? `<p style="margin:20px 0;">${button(paymentUrl, `לתשלום ₪${order.totalPrice}`, '#2e7d32')}</p>
         <p style="color:#777;font-size:12px;">התשלום מתבצע בדף מאובטח של חברת הסליקה. פרטי האשראי אינם נשמרים אצלנו.</p>`
      : '';

  // הקישור נשלח רק אחרי הזמנה שאושרה — כך רק מי שבאמת הזמין יכול לכתוב ביקורת
  const reviewSection =
    isConfirmed && reviewUrl
      ? `<div style="margin-top:28px;padding-top:20px;border-top:1px solid #ddd;">
          <p style="${FONT}margin:0 0 12px;">אחרי שתטעמו — נשמח לשמוע מה חשבתם.</p>
          ${button(reviewUrl, 'לכתיבת ביקורת', '#B08D57')}
        </div>`
      : '';

  return `<div dir="rtl" style="${FONT}font-size:14px;color:#222;">
    <h2>${headline}</h2>
    <p>שלום ${escapeHtml(order.contactName)},</p>
    <p>${body}</p>
    ${paymentSection}

    <h3>פירוט ההזמנה</h3>
    <table style="border-collapse:collapse;">${renderItems(order)}</table>

    ${renderTotals(order)}
    ${reviewSection}

    <p style="color:#777;font-size:12px;">מספר אסמכתא: ${order.uuid.slice(0, 8).toUpperCase()}</p>
    ${renderCustomerFooter()}
  </div>`;
};
