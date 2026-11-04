import {
  DEFAULT_OPENING_HOURS,
  MAX_DAYS_AHEAD,
  MIN_LEAD_MINUTES,
  SLOT_MINUTES,
} from '@shared/consts/schedule.const';

const MS_PER_MINUTE = 60_000;

const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const startOfDay = (date: Date): Date => {
  const copy = new Date(date);

  copy.setHours(0, 0, 0, 0);

  return copy;
};

export type ScheduleSlot = {
  /** ISO של תחילת החלון. */
  value: string;
  /** שעה להצגה, למשל "18:15". */
  label: string;
};

export type ScheduleDay = {
  /** התאריך בפורמט YYYY-MM-DD לפי שעון המכשיר. */
  date: string;
  label: string;
  slots: ScheduleSlot[];
};

const pad = (value: number): string => String(value).padStart(2, '0');

const formatTime = (date: Date): string => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** האם הזמן נופל בדיוק על תחילת חלון של רבע שעה. */
export const isOnSlotBoundary = (date: Date): boolean =>
  date.getMinutes() % SLOT_MINUTES === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0;

/** האם החלון בתוך שעות הפעילות של אותו יום. */
export const isWithinOpeningHours = (date: Date): boolean => {
  const hours = DEFAULT_OPENING_HOURS[date.getDay()];

  if (!hours) {
    return false;
  }

  const minutes = date.getHours() * 60 + date.getMinutes();

  return minutes >= toMinutes(hours.open) && minutes < toMinutes(hours.close);
};

/** ולידציה של חלון שנבחר — משותפת ללקוח ולשרת. מחזירה הודעת שגיאה או null. */
export const validateSlot = (scheduledFor: Date, now: Date = new Date()): string | null => {
  if (Number.isNaN(scheduledFor.getTime())) {
    return 'מועד ההזמנה אינו תקין';
  }

  if (!isOnSlotBoundary(scheduledFor)) {
    return 'יש לבחור חלון זמן בקפיצות של רבע שעה';
  }

  const earliest = now.getTime() + MIN_LEAD_MINUTES * MS_PER_MINUTE;

  if (scheduledFor.getTime() < earliest) {
    return `יש להזמין לפחות ${MIN_LEAD_MINUTES} דקות מראש`;
  }

  const latest = startOfDay(now).getTime() + (MAX_DAYS_AHEAD + 1) * 24 * 60 * MS_PER_MINUTE;

  if (scheduledFor.getTime() >= latest) {
    return `אפשר לתזמן הזמנה עד ${MAX_DAYS_AHEAD} ימים קדימה`;
  }

  if (!isWithinOpeningHours(scheduledFor)) {
    return 'החלון שנבחר מחוץ לשעות הפעילות';
  }

  return null;
};

const DAY_NAMES = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'שישי', 'שבת'];

const buildDayLabel = (date: Date, offset: number): string => {
  if (offset === 0) {
    return 'היום';
  }

  if (offset === 1) {
    return 'מחר';
  }

  return `${DAY_NAMES[date.getDay()]} ${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
};

/** כל החלונות הזמינים להזמנה, מקובצים לפי יום. ימים בלי חלונות לא מוחזרים. */
export const buildScheduleDays = (now: Date = new Date()): ScheduleDay[] => {
  const days: ScheduleDay[] = [];

  for (let offset = 0; offset <= MAX_DAYS_AHEAD; offset += 1) {
    const day = startOfDay(now);

    day.setDate(day.getDate() + offset);

    const hours = DEFAULT_OPENING_HOURS[day.getDay()];

    if (!hours) {
      continue;
    }

    const slots: ScheduleSlot[] = [];

    for (
      let minutes = toMinutes(hours.open);
      minutes < toMinutes(hours.close);
      minutes += SLOT_MINUTES
    ) {
      const slot = new Date(day);

      slot.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);

      if (validateSlot(slot, now) === null) {
        slots.push({ value: slot.toISOString(), label: formatTime(slot) });
      }
    }

    if (slots.length) {
      days.push({ date: formatDate(day), label: buildDayLabel(day, offset), slots });
    }
  }

  return days;
};
