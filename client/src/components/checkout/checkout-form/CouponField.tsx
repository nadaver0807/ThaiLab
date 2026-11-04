'use client';

import { useState, type FC } from 'react';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';

type CouponFieldProps = {
  appliedCode: string | null;
  discount: number;
  isPending: boolean;
  errorMessage?: string;
  onApply: (code: string) => void;
  onRemove: () => void;
};

const CouponField: FC<CouponFieldProps> = ({
  appliedCode,
  discount,
  isPending,
  errorMessage,
  onApply,
  onRemove,
}) => {
  const [code, setCode] = useState('');

  return (
    <Stack spacing={1.5}>
      <Typography variant="h3" component="h2">
        קוד קופון
      </Typography>

      {appliedCode ? (
        <Alert
          severity="success"
          action={
            <Button color="inherit" size="small" onClick={onRemove}>
              הסרה
            </Button>
          }
        >
          הקופון {appliedCode} הופעל — הנחה של ₪{discount}
        </Alert>
      ) : (
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            fullWidth
            label="יש לך קופון?"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <Button
            variant="outlined"
            disabled={!code.trim() || isPending}
            onClick={() => onApply(code)}
          >
            {isPending ? 'בודק…' : 'הפעלה'}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default CouponField;
