'use client';

import { useMemo, useState, type FC } from 'react';
import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import { buildScheduleDays } from '@shared/util/schedule.util';

type ScheduleFieldProps = {
  /** ISO של החלון שנבחר, או ריק = בהקדם האפשרי. */
  value: string | null | undefined;
  onChange: (value: string | null) => void;
};

const ASAP = 'asap';

const ScheduleField: FC<ScheduleFieldProps> = ({ value, onChange }) => {
  const days = useMemo(() => buildScheduleDays(new Date()), []);
  const [dayDate, setDayDate] = useState<string>(ASAP);

  const selectedDay = days.find((day) => day.date === dayDate);

  const handleDayChange = (next: string) => {
    setDayDate(next);
    onChange(null);
  };

  return (
    <Stack spacing={1.5}>
      <Typography variant="h3" component="h2">
        מתי?
      </Typography>

      <TextField
        select
        size="small"
        label="יום"
        value={dayDate}
        onChange={(event) => handleDayChange(event.target.value)}
      >
        <MenuItem value={ASAP}>בהקדם האפשרי</MenuItem>
        {days.map((day) => (
          <MenuItem key={day.date} value={day.date}>
            {day.label}
          </MenuItem>
        ))}
      </TextField>

      {selectedDay && (
        <TextField
          select
          size="small"
          label="שעה"
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value || null)}
        >
          {selectedDay.slots.map((slot) => (
            <MenuItem key={slot.value} value={slot.value}>
              {slot.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Stack>
  );
};

export default ScheduleField;
