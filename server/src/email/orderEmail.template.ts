import { DEFAULT_PRICE_KEY } from '@shared/consts/order.const';
import { OrderTypeLabel } from '@shared/enums/order-type.enum';
import { type OrderSummary } from '@shared/types/order.type';

const FONT = 'font-family:Arial,Helvetica,sans-serif;';

/** מנטרל תווי HTML כדי שקלט מהלקוח לא יישתל בגוף המייל. */
export const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const renderItems = (order: OrderSummary): string =>
  order.items
    .map((item) => {
      const option = item.priceKey === DEFAULT_PRICE_KEY ? '' : ` (${escapeHtml(item.priceKey)})`;

      return `<tr>
        <td style="padding:6px 10px;border:1px solid #ddd;">${item.quantity} × ${escapeHtml(item.dishName)}${option}</td>
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

/** מייל ללקוח לאחר החלטת המנהל. */
export const renderCustomerDecisionEmail = (order: OrderSummary, isConfirmed: boolean): string => {
  const headline = isConfirmed ? 'ההזמנה שלכם אושרה!' : 'ההזמנה שלכם לא אושרה';

  const body = isConfirmed
    ? `אנחנו מתחילים להכין. ${
        order.address
          ? `המשלוח יגיע לכתובת ${escapeHtml(order.address)}.`
          : 'נעדכן אתכם כשההזמנה תהיה מוכנה לאיסוף.'
      } התשלום מתבצע במקום, במזומן או באשראי.`
    : 'לצערנו לא נוכל להכין את ההזמנה הפעם. נשמח לעמוד לרשותכם בטלפון לפרטים נוספים.';

  return `<div dir="rtl" style="${FONT}font-size:14px;color:#222;">
    <h2>${headline}</h2>
    <p>שלום ${escapeHtml(order.contactName)},</p>
    <p>${body}</p>

    <h3>פירוט ההזמנה</h3>
    <table style="border-collapse:collapse;">${renderItems(order)}</table>

    ${renderTotals(order)}

    <p style="color:#777;font-size:12px;">מספר אסמכתא: ${order.uuid.slice(0, 8).toUpperCase()}</p>
  </div>`;
};
