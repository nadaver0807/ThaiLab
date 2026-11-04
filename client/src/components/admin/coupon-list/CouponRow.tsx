'use client';

import { type FC } from 'react';
import { Box, Chip, IconButton, Stack, Switch, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CouponType } from '@shared/enums/coupon-type.enum';
import { type CouponSummary } from '@shared/types/coupon.type';

type CouponRowProps = {
  coupon: CouponSummary;
  onToggle: (isActive: boolean) => void;
  onDelete: () => void;
};

const formatValue = (coupon: CouponSummary): string =>
  coupon.type === CouponType.Percent ? `${coupon.value}%` : `₪${coupon.value}`;

const formatDate = (iso: string | null): string =>
  iso ? new Date(iso).toLocaleDateString('he-IL') : 'ללא תפוגה';

const CouponRow: FC<CouponRowProps> = ({ coupon, onToggle, onDelete }) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}
  >
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        {coupon.code} — {formatValue(coupon)}
      </Typography>
      <Typography variant="body2">
        {coupon.minSubtotal > 0 && `מינימום ₪${coupon.minSubtotal} • `}
        שימושים: {coupon.usedCount}
        {coupon.maxUses !== null && `/${coupon.maxUses}`} • {formatDate(coupon.expiresAt)}
      </Typography>
    </Box>

    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Chip
        size="small"
        color={coupon.isActive ? 'success' : 'default'}
        label={coupon.isActive ? 'פעיל' : 'כבוי'}
      />
      <Switch
        checked={coupon.isActive}
        slotProps={{ input: { 'aria-label': `הפעלת הקופון ${coupon.code}` } }}
        onChange={(_event, checked) => onToggle(checked)}
      />
      <IconButton aria-label={`מחיקת הקופון ${coupon.code}`} onClick={onDelete}>
        <DeleteRoundedIcon />
      </IconButton>
    </Stack>
  </Stack>
);

export default CouponRow;
