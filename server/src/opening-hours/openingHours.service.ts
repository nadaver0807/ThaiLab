import { AppDataSource } from '@/config/db/db.config';
import { OpeningHours } from '@/opening-hours/OpeningHours.entity';
import { DEFAULT_OPENING_HOURS } from '@shared/consts/schedule.const';
import { type OpeningHoursDay } from '@shared/types/opening-hours.type';

const OpeningHoursRepository = AppDataSource.getRepository(OpeningHours);

const toDay = (row: OpeningHours): OpeningHoursDay => ({
  day: row.day,
  isOpen: row.isOpen,
  open: row.open,
  close: row.close,
});

/** שעות הפעילות השמורות. אם הטבלה ריקה, חוזרים לברירת המחדל שבקוד. */
export const getOpeningHours = async (): Promise<OpeningHoursDay[]> => {
  const rows = await OpeningHoursRepository.find({ order: { day: 'ASC' } });

  return rows.length ? rows.map(toDay) : DEFAULT_OPENING_HOURS;
};

export const saveOpeningHours = async (days: OpeningHoursDay[]): Promise<OpeningHoursDay[]> => {
  await OpeningHoursRepository.save(days.map((entry) => OpeningHoursRepository.create(entry)));

  return getOpeningHours();
};
