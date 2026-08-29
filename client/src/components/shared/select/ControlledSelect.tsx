'use client';

import { MenuItem, TextField } from '@mui/material';
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';

export type SelectOption = {
  value: string;
  label: string;
};

type ThailabSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  options: SelectOption[];
};

const ThailabSelect = <TFieldValues extends FieldValues>({
  name,
  label,
  options,
}: ThailabSelectProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          fullWidth
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ' '}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default ThailabSelect;
