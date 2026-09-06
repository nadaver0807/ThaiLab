/** מצב הביקורת — ביקורות חדשות ממתינות לאישור של עופר לפני שהן עולות לאתר. */
export enum ReviewStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

export const ReviewStatusLabel: Record<ReviewStatus, string> = {
  [ReviewStatus.Pending]: 'ממתינה לאישור',
  [ReviewStatus.Approved]: 'מאושרת',
  [ReviewStatus.Rejected]: 'נדחתה',
};
