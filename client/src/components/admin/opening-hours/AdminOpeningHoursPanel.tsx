'use client';

import { useState, type FC } from 'react';
import { Alert, Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { type OpeningHoursDay } from '@shared/types/opening-hours.type';
import { updateOpeningHoursSchema } from '@shared/validations/opening-hours.validation';
import { useGetOpeningHours, useUpdateOpeningHours } from '@/hooks/api/useOpeningHours';
import useGetDishes from '@/hooks/api/useGetDishes';
import useAuth from '@/hooks/auth/useAuth';

const DAY_LABELS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

type EditorProps = {
  initialDays: OpeningHoursDay[];
};

const OpeningHoursEditor: FC<EditorProps> = ({ initialDays }) => {
  const save = useUpdateOpeningHours();
  const [days, setDays] = useState<OpeningHoursDay[]>(initialDays);
  const [error, setError] = useState<string>();
  const [isSaved, setIsSaved] = useState(false);

  const updateDay = (day: number, patch: Partial<OpeningHoursDay>) => {
    setIsSaved(false);
    setDays((current) =>
      current.map((entry) => (entry.day === day ? { ...entry, ...patch } : entry)),
    );
  };

  const handleSave = async () => {
    setError(undefined);

    const parsed = updateOpeningHoursSchema.safeParse({ days });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'הפרטים אינם תקינים');

      return;
    }

    try {
      await save.mutateAsync(parsed.data);
      setIsSaved(true);
    } catch (caught) {
      setError((caught as Error).message);
    }
  };

  return (
    <Stack spacing={2}>
      {days.map((entry) => (
        <Stack
          key={entry.day}
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
          <FormControlLabel
            sx={{ minWidth: 120 }}
            label={`יום ${DAY_LABELS[entry.day]}`}
            control={
              <Checkbox
                checked={entry.isOpen}
                onChange={(event) => updateDay(entry.day, { isOpen: event.target.checked })}
              />
            }
          />
          <TextField
            size="small"
            type="time"
            label="פתיחה"
            value={entry.open}
            disabled={!entry.isOpen}
            onChange={(event) => updateDay(entry.day, { open: event.target.value })}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            size="small"
            type="time"
            label="סגירה"
            value={entry.close}
            disabled={!entry.isOpen}
            onChange={(event) => updateDay(entry.day, { close: event.target.value })}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Stack>
      ))}

      {error && <Alert severity="error">{error}</Alert>}
      {isSaved && <Alert severity="success">השעות נשמרו.</Alert>}

      <div>
        <Button variant="contained" disabled={save.isPending} onClick={handleSave}>
          {save.isPending ? 'שומר…' : 'שמירה'}
        </Button>
      </div>
    </Stack>
  );
};

const AdminOpeningHoursPanel: FC = () => {
  const { userEmail } = useAuth();
  const { data: dishes } = useGetDishes();
  const { days, isSuccess } = useGetOpeningHours();
  const isAdmin = Boolean(userEmail && dishes?.isAdmin);

  if (!isAdmin) {
    return <Alert severity="info">יש להתחבר כמנהל כדי לערוך שעות פעילות.</Alert>;
  }

  if (!isSuccess) {
    return <Alert severity="info">טוען…</Alert>;
  }

  // ה-key מאפס את הטופס אם השעות נטענו מחדש מהשרת
  return <OpeningHoursEditor key={JSON.stringify(days)} initialDays={days} />;
};

export default AdminOpeningHoursPanel;
