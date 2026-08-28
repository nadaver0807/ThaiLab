'use client';

import { TextField } from '@mui/material';
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';
import Styles from '@components/shared/text-field/ControlledTextField.style';

type ThailabTextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  type?: 'text' | 'tel' | 'email' | 'number' | 'date';
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  required?: boolean;
  fullWidth?: boolean;
};

const ThailabTextField = <TFieldValues extends FieldValues>({
  name,
  label,
  type = 'text',
  multiline = false,
  rows,
  minRows,
  required = false,
  fullWidth = true,
}: ThailabTextFieldProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          multiline={multiline}
          rows={rows}
          minRows={minRows}
          required={required}
          fullWidth={fullWidth}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ' '}
          sx={Styles.field}
        />
      )}
    />
  );
};

export default ThailabTextField;
