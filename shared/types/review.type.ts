import { type ReviewStatus } from '@shared/enums/review-status.enum';
import { type ServiceType } from '@shared/enums/service-type.enum';

export type Review = {
  uuid: string;
  authorName: string;
  serviceType: ServiceType;
  rating: number;
  title?: string | null;
  content: string;
  status: ReviewStatus;
  createDate: string;
};

export type GetReviewsResponse = {
  reviews: Review[];
  isAdmin: boolean;
};

export type UpdateReviewStatusParams = {
  uuid: string;
  status: ReviewStatus;
};

/** בדיקה אם ההזמנה מזכה בכתיבת ביקורת — נקראת מהקישור שבמייל. */
export type ReviewEligibilityResponse =
  | { isEligible: true; contactName: string; contactEmail: string }
  | { isEligible: false; reason: 'NOT_FOUND' | 'ALREADY_REVIEWED' };
