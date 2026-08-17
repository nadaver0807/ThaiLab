export enum HospitalityType {
  PrivateEvent = "PRIVATE_EVENT",
  Corporate = "CORPORATE",
  Wedding = "WEDDING",
  CookingClass = "COOKING_CLASS",
  Catering = "CATERING",
}

export const HospitalityTypeLabel: Record<HospitalityType, string> = {
  [HospitalityType.PrivateEvent]: "אירוע פרטי",
  [HospitalityType.Corporate]: "אירוע חברה",
  [HospitalityType.Wedding]: "חתונה",
  [HospitalityType.CookingClass]: "סדנת בישול",
  [HospitalityType.Catering]: "קייטרינג",
};
