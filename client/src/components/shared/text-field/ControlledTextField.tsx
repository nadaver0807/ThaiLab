'use client';

import { TextField } from '@mui/material';
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form';
import Styles from '@components/shared/text-field/ControlledTextField.style';

type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  type?: 'text' | 'tel' | 'email' | 'number' | 'date';
  multiline?: boolean;
  rows?: number;
};

const ControlledTextField = <TFieldValues extends FieldValues>({
  name,
  label,
  type = 'text',
  multiline = false,
  rows,
}: ControlledTextFieldProps<TFieldValues>) => {
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
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ' '}
          sx={Styles.field}
        />
      )}
    />
  );
};

export default ControlledTextField;
