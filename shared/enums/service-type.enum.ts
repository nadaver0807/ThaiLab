/** שלושת סוגי השירות של ThaiLab — ההפרדה המרכזית בחוויית ההזמנה. */
export enum ServiceType {
  /** מנות להזמנה, איסוף עצמי או משלוח */
  TakeAwayDelivery = 'TAKE_AWAY_DELIVERY',
  /** ארוחת שף אצל עופר, בבית/בגג בבת שלמה */
  ChefAtHome = 'CHEF_AT_HOME',
  /** שף פרטי ואירועים אצל הלקוח */
  PrivateEvents = 'PRIVATE_EVENTS',
}

export const ServiceTypeLabel: Record<ServiceType, string> = {
  [ServiceType.TakeAwayDelivery]: 'טייק אווי ומשלוחים',
  [ServiceType.ChefAtHome]: 'ארוחות שף אצלי בבית',
  [ServiceType.PrivateEvents]: 'אירועים וארוחות פרטיות',
};

export const SERVICE_TYPE_ORDER: ServiceType[] = [
  ServiceType.TakeAwayDelivery,
  ServiceType.ChefAtHome,
  ServiceType.PrivateEvents,
];
