'use client';

import { type FC } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Styles from '@components/cart/quantity-stepper/QuantityStepper.style';

type QuantityStepperProps = {
  quantity: number;
  label: string;
  onChange: (quantity: number) => void;
};

const QuantityStepper: FC<QuantityStepperProps> = ({ quantity, label, onChange }) => (
  <Stack sx={Styles.stepper}>
    <IconButton
      size="small"
      sx={Styles.button}
      aria-label={quantity === 1 ? `הסרת ${label} מהעגלה` : `הפחתת כמות של ${label}`}
      onClick={() => onChange(quantity - 1)}
    >
      {quantity === 1 ? (
        <DeleteOutlineRoundedIcon fontSize="small" />
      ) : (
        <RemoveRoundedIcon fontSize="small" />
      )}
    </IconButton>

    <Typography variant="body2" sx={Styles.quantity} aria-live="polite">
      {quantity}
    </Typography>

    <IconButton
      size="small"
      sx={Styles.button}
      aria-label={`הוספת כמות של ${label}`}
      onClick={() => onChange(quantity + 1)}
    >
      <AddRoundedIcon fontSize="small" />
    </IconButton>
  </Stack>
);

export default QuantityStepper;
