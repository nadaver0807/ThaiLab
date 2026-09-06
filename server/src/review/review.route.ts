import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { type Review } from '@/review/Review.entity';
import {
  checkEligibility,
  create,
  findAll,
  findApproved,
  remove,
  updateStatus,
} from '@/review/review.service';
import { buildNewReviewEmail } from '@/email/reviewEmail.template';
import { sendHtmlEmail } from '@/email/email.service';
import { attachUser, requireAdmin } from '@/middlewares/auth.middleware';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { ADMIN_EMAIL } from '@/server.const';
import { type MessageResponse, type UuidParams } from '@shared/types/api.type';
import {
  type GetReviewsResponse,
  type Review as PublicReview,
  type ReviewEligibilityResponse,
} from '@shared/types/review.type';
import { ReviewStatus } from '@shared/enums/review-status.enum';
import {
  createReviewSchema,
  type CreateReviewPayload,
} from '@shared/validations/review.validation';

const reviewRouter = Router();

/** ממפה לתגובה הציבורית — בלי האימייל של הכותב. */
const toPublicReview = (review: Review): PublicReview => ({
  uuid: review.uuid,
  authorName: review.authorName,
  serviceType: review.serviceType,
  rating: review.rating,
  title: review.title,
  content: review.content,
  status: review.status,
  createDate: review.createDate.toISOString(),
});

reviewRouter.get(
  '/',
  attachUser,
  async (request: Request, response: Response<GetReviewsResponse>) => {
    const isAdmin = Boolean(request.isAdmin);
    const reviews = isAdmin ? await findAll() : await findApproved();

    response.status(StatusCodes.OK).json({
      reviews: reviews.map(toPublicReview),
      isAdmin,
    });
  },
);

reviewRouter.get(
  '/eligibility/:uuid',
  async (
    request: Request<UuidParams>,
    response: Response<ReviewEligibilityResponse | MessageResponse>,
  ) => {
    const eligibility = await checkEligibility(request.params.uuid);

    if (!eligibility.isEligible) {
      response.status(StatusCodes.OK).json({
        isEligible: false,
        reason: eligibility.reason,
      });

      return;
    }

    response.status(StatusCodes.OK).json({
      isEligible: true,
      contactName: eligibility.contactName,
      contactEmail: eligibility.contactEmail,
    });
  },
);

reviewRouter.post(
  '/',
  validateZodSchema(createReviewSchema),
  async (
    request: Request<unknown, MessageResponse, CreateReviewPayload>,
    response: Response<MessageResponse>,
  ) => {
    const eligibility = await checkEligibility(request.body.orderUuid);

    if (!eligibility.isEligible) {
      const message =
        eligibility.reason === 'ALREADY_REVIEWED'
          ? 'כבר נשלחה ביקורת על ההזמנה הזו'
          : 'ההזמנה לא נמצאה';

      response.status(StatusCodes.FORBIDDEN).json({ message });

      return;
    }

    const review = await create(request.body);

    // המייל לא אמור להפיל את הבקשה — הביקורת כבר נשמרה
    try {
      await sendHtmlEmail({
        to: ADMIN_EMAIL,
        subject: `ביקורת חדשה מ${review.authorName}`,
        html: buildNewReviewEmail(review),
        replyTo: review.authorEmail,
      });
    } catch {
      // נכשלה שליחת המייל — הביקורת נשמרה ותופיע באזור הניהול
    }

    response.status(StatusCodes.CREATED).json({
      message: 'תודה! הביקורת התקבלה ותעלה לאתר אחרי אישור.',
    });
  },
);

reviewRouter.patch(
  '/:uuid/status',
  requireAdmin,
  async (
    request: Request<UuidParams, Review | MessageResponse, { status: ReviewStatus }>,
    response: Response<Review | MessageResponse>,
  ) => {
    const { status } = request.body;

    if (!Object.values(ReviewStatus).includes(status)) {
      response.status(StatusCodes.BAD_REQUEST).json({ message: 'סטטוס לא תקין' });

      return;
    }

    const review = await updateStatus(request.params.uuid, status);

    if (!review) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'הביקורת לא נמצאה' });

      return;
    }

    response.status(StatusCodes.OK).json(review);
  },
);

reviewRouter.delete(
  '/:uuid',
  requireAdmin,
  async (request: Request<UuidParams>, response: Response<MessageResponse>) => {
    const isDeleted = await remove(request.params.uuid);

    if (!isDeleted) {
      response.status(StatusCodes.NOT_FOUND).json({ message: 'הביקורת לא נמצאה' });

      return;
    }

    response.status(StatusCodes.OK).json({ message: 'הביקורת נמחקה' });
  },
);

export default reviewRouter;
