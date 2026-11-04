'use client';

import { useState, type FC } from 'react';
import { Alert, Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { CouponType, CouponTypeLabel } from '@shared/enums/coupon-type.enum';
import { createCouponSchema } from '@shared/validations/coupon.validation';
import {
  useCreateCoupon,
  useDeleteCoupon,
  useGetCoupons,
  useUpdateCoupon,
} from '@/hooks/api/useCoupons';
import CouponRow from '@components/admin/coupon-list/CouponRow';
import useGetDishes from '@/hooks/api/useGetDishes';
import useAuth from '@/hooks/auth/useAuth';

type FormState = {
  code: string;
  type: CouponType;
  value: string;
  minSubtotal: string;
  maxUses: string;
  expiresAt: string;
};

const EMPTY_FORM: FormState = {
  code: '',
  type: CouponType.Percent,
  value: '',
  minSubtotal: '0',
  maxUses: '',
  expiresAt: '',
};

const AdminCouponsPanel: FC = () => {
  const { userEmail } = useAuth();
  const { data: dishes } = useGetDishes();
  const isAdmin = Boolean(userEmail && dishes?.isAdmin);

  const { data } = useGetCoupons(isAdmin);
  const create = useCreateCoupon();
  const update = useUpdateCoupon();
  const remove = useDeleteCoupon();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<string>();

  if (!isAdmin) {
    return <Alert severity="info">יש להתחבר כמנהל כדי לנהל קופונים.</Alert>;
  }

  const setField = (field: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleCreate = async () => {
    setError(undefined);

    const parsed = createCouponSchema.safeParse({
      code: form.code,
      type: form.type,
      value: Number(form.value),
      minSubtotal: Number(form.minSubtotal || 0),
      maxUses: form.maxUses ? Number(form.maxUses) : null,
      // תאריך התפוגה הוא סוף היום שנבחר
      expiresAt: form.expiresAt ? new Date(`${form.expiresAt}T23:59:59`).toISOString() : null,
      isActive: true,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'הפרטים אינם תקינים');

      return;
    }

    try {
      await create.mutateAsync(parsed.data);
      setForm(EMPTY_FORM);
    } catch (caught) {
      setError((caught as Error).message);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h3" component="h2">
          קופון חדש
        </Typography>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          <TextField
            label="קוד"
            value={form.code}
            onChange={(event) => setField('code', event.target.value)}
          />
          <TextField
            select
            label="סוג הנחה"
            value={form.type}
            onChange={(event) => setField('type', event.target.value)}
          >
            {Object.values(CouponType).map((type) => (
              <MenuItem key={type} value={type}>
                {CouponTypeLabel[type]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={form.type === CouponType.Percent ? 'אחוז הנחה' : 'סכום הנחה (₪)'}
            type="number"
            value={form.value}
            onChange={(event) => setField('value', event.target.value)}
          />
          <TextField
            label="מינימום הזמנה (₪)"
            type="number"
            value={form.minSubtotal}
            onChange={(event) => setField('minSubtotal', event.target.value)}
          />
          <TextField
            label="מגבלת שימושים (ריק = ללא הגבלה)"
            type="number"
            value={form.maxUses}
            onChange={(event) => setField('maxUses', event.target.value)}
          />
          <TextField
            label="תוקף עד"
            type="date"
            value={form.expiresAt}
            onChange={(event) => setField('expiresAt', event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Box>
          <Button variant="contained" disabled={create.isPending} onClick={handleCreate}>
            {create.isPending ? 'יוצר…' : 'יצירת קופון'}
          </Button>
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h3" component="h2">
          קופונים קיימים
        </Typography>

        {!data?.coupons.length && <Alert severity="info">עדיין אין קופונים.</Alert>}

        {data?.coupons.map((coupon) => (
          <CouponRow
            key={coupon.uuid}
            coupon={coupon}
            onToggle={(isActive) => update.mutate({ uuid: coupon.uuid, payload: { isActive } })}
            onDelete={() => {
              if (window.confirm(`למחוק את הקופון ${coupon.code}?`)) {
                remove.mutate(coupon.uuid);
              }
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default AdminCouponsPanel;
