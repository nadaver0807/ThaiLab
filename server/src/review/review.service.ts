import { AppDataSource } from '@/config/db/db.config';
import { Review } from '@/review/Review.entity';
import { Order } from '@/order/Order.entity';
import { ReviewStatus } from '@shared/enums/review-status.enum';
import { type CreateReviewPayload } from '@shared/validations/review.validation';

const ReviewRepository = AppDataSource.getRepository(Review);
const OrderRepository = AppDataSource.getRepository(Order);

const NEWEST_FIRST = { createDate: 'DESC' } as const;

/** רק ביקורות מאושרות מוצגות באתר. */
export const findApproved = async (): Promise<Review[]> =>
  ReviewRepository.find({ where: { status: ReviewStatus.Approved }, order: NEWEST_FIRST });

/** לאדמין — כל הביקורות, כולל אלו שממתינות לאישור. */
export const findAll = async (): Promise<Review[]> =>
  ReviewRepository.find({ order: NEWEST_FIRST });

export type ReviewEligibility =
  | { isEligible: true; contactName: string; contactEmail: string }
  | { isEligible: false; reason: 'NOT_FOUND' | 'ALREADY_REVIEWED' };

/** בודק שההזמנה קיימת ושעדיין לא נכתבה עליה ביקורת. */
export const checkEligibility = async (orderUuid: string): Promise<ReviewEligibility> => {
  const order = await OrderRepository.findOne({ where: { uuid: orderUuid } });

  if (!order) {
    return { isEligible: false, reason: 'NOT_FOUND' };
  }

  const existing = await ReviewRepository.findOne({ where: { orderUuid } });

  if (existing) {
    return { isEligible: false, reason: 'ALREADY_REVIEWED' };
  }

  return {
    isEligible: true,
    contactName: order.contactName,
    contactEmail: order.contactEmail,
  };
};

export const create = async (payload: CreateReviewPayload): Promise<Review> =>
  ReviewRepository.save(ReviewRepository.create({ ...payload, title: payload.title || null }));

export const updateStatus = async (uuid: string, status: ReviewStatus): Promise<Review | null> => {
  const review = await ReviewRepository.findOne({ where: { uuid } });

  if (!review) {
    return null;
  }

  review.status = status;

  return ReviewRepository.save(review);
};

/** מחיקה רכה — ההיסטוריה נשמרת דרך `deleteDate`. */
export const remove = async (uuid: string): Promise<boolean> => {
  const result = await ReviewRepository.softDelete({ uuid });

  return Boolean(result.affected);
};
