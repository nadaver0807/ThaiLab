export type OpeningHoursRow = {
  days: string;
  hours: string;
};

export const OPENING_HOURS: OpeningHoursRow[] = [
  { days: 'ראשון–חמישי', hours: '12:00–23:00' },
  { days: 'שישי', hours: '12:00–16:00' },
  { days: 'שבת', hours: '19:00–23:30' },
];
