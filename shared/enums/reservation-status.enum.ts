export enum ReservationStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Seated = 'SEATED',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

export const ReservationStatusLabel: Record<ReservationStatus, string> = {
  [ReservationStatus.Pending]: 'ממתין',
  [ReservationStatus.Confirmed]: 'אושר',
  [ReservationStatus.Seated]: 'ישובים',
  [ReservationStatus.Completed]: 'הושלם',
  [ReservationStatus.Cancelled]: 'בוטל',
};
