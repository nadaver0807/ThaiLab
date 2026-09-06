import { escapeHtml } from '@/email/orderEmail.template';
import { ServiceTypeLabel } from '@shared/enums/service-type.enum';
import { type Review } from '@/review/Review.entity';

const FONT = 'font-family:Arial,Helvetica,sans-serif;';

const renderStars = (rating: number): string => '★'.repeat(rating) + '☆'.repeat(5 - rating);

/** מייל שנשלח לעופר בכל פעם שלקוח משאיר ביקורת חדשה. */
export const buildNewReviewEmail = (review: Review): string => {
  const title = review.title
    ? `<h3 style="${FONT}margin:0 0 8px;">${escapeHtml(review.title)}</h3>`
    : '';

  return `<div style="${FONT}direction:rtl;text-align:right;font-size:14px;color:#2E2A22;">
    <h2 style="${FONT}margin:0 0 16px;">התקבלה ביקורת חדשה</h2>
    <table style="border-collapse:collapse;${FONT}font-size:14px;margin-bottom:16px;">
      <tr>
        <td style="padding:6px 10px;border:1px solid #ddd;font-weight:700;">שם</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(review.authorName)}</td>
      </tr>
      <tr>
        <td style="padding:6px 10px;border:1px solid #ddd;font-weight:700;">אימייל</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(review.authorEmail)}</td>
      </tr>
      <tr>
        <td style="padding:6px 10px;border:1px solid #ddd;font-weight:700;">על מה</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">${ServiceTypeLabel[review.serviceType]}</td>
      </tr>
      <tr>
        <td style="padding:6px 10px;border:1px solid #ddd;font-weight:700;">דירוג</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">${renderStars(review.rating)} (${review.rating}/5)</td>
      </tr>
    </table>
    ${title}
    <p style="${FONT}margin:0 0 16px;line-height:1.7;">${escapeHtml(review.content)}</p>
    <p style="${FONT}margin:0;color:#6E6552;">
      הביקורת ממתינה לאישור ולא מוצגת באתר עד שתאשר אותה באזור הניהול.
    </p>
  </div>`;
};
