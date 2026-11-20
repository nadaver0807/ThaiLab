'use client';

import { type ReactNode } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';
import Styles from '@components/shared/checkbox/ThailabCheckbox.style';

type ThailabCheckboxProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  /** יכול לכלול קישורים (למשל למדיניות הפרטיות). */
  label: ReactNode;
};

/** תיבת סימון מבוקרת. אף פעם לא מסומנת מראש — הסכמה חייבת להיות פעולה מפורשת. */
const ThailabCheckbox = <TFieldValues extends FieldValues>({
  name,
  label,
}: ThailabCheckboxProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} sx={Styles.root}>
          <FormControlLabel
            label={label}
            sx={Styles.label}
            control={
              <Checkbox
                checked={Boolean(field.value)}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                name={field.name}
                slotProps={{ input: { ref: field.ref } }}
              />
            }
          />
          <FormHelperText>{fieldState.error?.message ?? ' '}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default ThailabCheckbox;
