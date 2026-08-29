'use client';

import { FormControlLabel, Switch } from '@mui/material';
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

type ThailabSwitchProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
};

const ThailabSwitch = <TFieldValues extends FieldValues>({
  name,
  label,
}: ThailabSwitchProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <Switch
              checked={Boolean(field.value)}
              onChange={(event) => field.onChange(event.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
            />
          }
        />
      )}
    />
  );
};

export default ThailabSwitch;
