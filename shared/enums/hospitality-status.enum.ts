export enum HospitalityStatus {
  Requested = "REQUESTED",
  Quoted = "QUOTED",
  Confirmed = "CONFIRMED",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

export const HospitalityStatusLabel: Record<HospitalityStatus, string> = {
  [HospitalityStatus.Requested]: "התקבלה בקשה",
  [HospitalityStatus.Quoted]: "נשלחה הצעת מחיר",
  [HospitalityStatus.Confirmed]: "אושר",
  [HospitalityStatus.Completed]: "הושלם",
  [HospitalityStatus.Cancelled]: "בוטל",
};
