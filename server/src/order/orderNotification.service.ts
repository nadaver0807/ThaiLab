import { ADMIN_EMAIL, CLIENT_ORIGIN, SERVER_PUBLIC_URL } from '@/server.const';
import { sendHtmlEmail } from '@/email/email.service';
import { renderOrderPdf } from '@/order/orderPdf.service';
import {
  renderAdminOrderEmail,
  renderAdminPaymentEmail,
  renderCustomerDecisionEmail,
  type PaidOrderDetails,
} from '@/email/orderEmail.template';
import { createDecisionToken, createPaymentToken, OrderDecision } from '@/util/decisionToken.util';
import { logger, toSafeError } from '@/util/logger';
import { type OrderSummary } from '@shared/types/order.type';
import { Route } from '@shared/enums/route.enum';

const buildDecisionUrl = (orderUuid: string, decision: OrderDecision): string =>
  `${SERVER_PUBLIC_URL}/api/orders/${orderUuid}/decision/${decision}?token=${createDecisionToken(
    orderUuid,
    decision,
  )}`;

export const notifyAdminOfNewOrder = async (order: OrderSummary): Promise<void> => {
  // כשל ביצירת ה-PDF לא חוסם את המייל עצמו
  const attachments = await renderOrderPdf(order)
    .then((content) => [{ filename: `order-${order.uuid.slice(0, 8)}.pdf`, content }])
    .catch((error: unknown) => {
      logger.error(
        { err: toSafeError(error), orderUuid: order.uuid },
        'failed to render order PDF',
      );

      return undefined;
    });

  try {
    await sendHtmlEmail({
      to: ADMIN_EMAIL,
      attachments,
      subject: `הזמנה חדשה מ${order.contactName} — ₪${order.totalPrice}`,
      html: renderAdminOrderEmail(
        order,
        buildDecisionUrl(order.uuid, OrderDecision.Confirm),
        buildDecisionUrl(order.uuid, OrderDecision.Reject),
      ),
      replyTo: order.contactEmail,
    });
  } catch (error) {
    logger.error(
      { err: toSafeError(error), orderUuid: order.uuid },
      'failed to send admin order email',
    );
  }
};

/** קישור חתום ללקוח — פותח דף תשלום אצל ספק הסליקה עבור ההזמנה הזו בלבד. */
export const buildPaymentUrl = (orderUuid: string): string =>
  `${SERVER_PUBLIC_URL}/api/payments/${orderUuid}/pay?token=${createPaymentToken(orderUuid)}`;

/** מעדכן את הלקוח שההזמנה אושרה או נדחתה. כשיש paymentUrl — המייל כולל קישור לתשלום. */
export const notifyCustomerOfDecision = async (
  order: OrderSummary,
  isConfirmed: boolean,
  paymentUrl?: string,
): Promise<void> => {
  if (!order.contactEmail) {
    return;
  }

  try {
    await sendHtmlEmail({
      to: order.contactEmail,
      subject: isConfirmed
        ? paymentUrl
          ? 'ההזמנה שלכם אושרה — קישור לתשלום — ThaiLab'
          : 'ההזמנה שלכם אושרה — ThaiLab'
        : 'עדכון לגבי ההזמנה שלכם — ThaiLab',
      html: renderCustomerDecisionEmail(
        order,
        isConfirmed,
        `${CLIENT_ORIGIN.replace(/\/$/, '')}${Route.Review}?order=${order.uuid}`,
        paymentUrl,
      ),
    });
  } catch (error) {
    logger.error(
      { err: toSafeError(error), orderUuid: order.uuid },
      'failed to send customer decision email',
    );
  }
};

/** מעדכן את בעל העסק שהתשלום על הזמנה התקבל ואומת מול ספק הסליקה. */
export const notifyAdminOfPayment = async (order: PaidOrderDetails): Promise<void> => {
  try {
    await sendHtmlEmail({
      to: ADMIN_EMAIL,
      subject: `התקבל תשלום מ${order.contactName} — ₪${order.totalPrice}`,
      html: renderAdminPaymentEmail(order),
      replyTo: order.contactEmail,
    });
  } catch (error) {
    logger.error(
      { err: toSafeError(error), orderUuid: order.uuid },
      'failed to send admin payment email',
    );
  }
};
