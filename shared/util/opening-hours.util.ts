import { type OpeningHoursDay } from '@shared/types/opening-hours.type';

/** שורה להצגה: "ראשון–חמישי: 12:00 - 21:00". */
export type OpeningHoursRow = {
  days: string;
  hours: string;
};

const DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const formatHours = ({ open, close }: OpeningHoursDay): string => `${open} - ${close}`;

const formatDays = (first: number, last: number): string =>
  first === last ? DAY_NAMES[first] : `${DAY_NAMES[first]}–${DAY_NAMES[last]}`;

/** מקבץ ימים רצופים עם אותן שעות לשורה אחת. ימים סגורים לא מוצגים. */
export const buildOpeningHoursRows = (days: OpeningHoursDay[]): OpeningHoursRow[] => {
  const sorted = [...days].sort((a, b) => a.day - b.day);
  const rows: OpeningHoursRow[] = [];
  let group: OpeningHoursDay[] = [];

  const flush = () => {
    if (group.length) {
      rows.push({
        days: formatDays(group[0].day, group[group.length - 1].day),
        hours: formatHours(group[0]),
      });
      group = [];
    }
  };

  for (const entry of sorted) {
    if (!entry.isOpen) {
      flush();
      continue;
    }

    const previous = group[group.length - 1];
    const isContinuation =
      previous && entry.day === previous.day + 1 && formatHours(entry) === formatHours(previous);

    if (!isContinuation) {
      flush();
    }

    group.push(entry);
  }

  flush();

  return rows;
};
