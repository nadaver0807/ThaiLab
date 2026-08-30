import { ADMIN_EMAIL, SERVER_PUBLIC_URL } from '@/server.const';
import { sendHtmlEmail } from '@/email/email.service';
import { renderAdminOrderEmail, renderCustomerDecisionEmail } from '@/email/orderEmail.template';
import { createDecisionToken, OrderDecision } from '@/util/decisionToken.util';
import { logger, toSafeError } from '@/util/logger';
import { type OrderSummary } from '@shared/types/order.type';

const buildDecisionUrl = (orderUuid: string, decision: OrderDecision): string =>
  `${SERVER_PUBLIC_URL}/api/orders/${orderUuid}/decision/${decision}?token=${createDecisionToken(
    orderUuid,
    decision,
  )}`;

export const notifyAdminOfNewOrder = async (order: OrderSummary): Promise<void> => {
  try {
    await sendHtmlEmail({
      to: ADMIN_EMAIL,
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

/** מעדכן את הלקוח שההזמנה אושרה או נדחתה. */
export const notifyCustomerOfDecision = async (
  order: OrderSummary,
  isConfirmed: boolean,
): Promise<void> => {
  if (!order.contactEmail) {
    return;
  }

  try {
    await sendHtmlEmail({
      to: order.contactEmail,
      subject: isConfirmed ? 'ההזמנה שלכם אושרה — ThaiLab' : 'עדכון לגבי ההזמנה שלכם — ThaiLab',
      html: renderCustomerDecisionEmail(order, isConfirmed),
    });
  } catch (error) {
    logger.error(
      { err: toSafeError(error), orderUuid: order.uuid },
      'failed to send customer decision email',
    );
  }
};
