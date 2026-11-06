/** שעות הפעילות של יום אחד. `day`: 0 = יום ראשון … 6 = שבת. */
export type OpeningHoursDay = {
  day: number;
  isOpen: boolean;
  /** HH:MM */
  open: string;
  /** HH:MM */
  close: string;
};

export type GetOpeningHoursResponse = {
  days: OpeningHoursDay[];
};
