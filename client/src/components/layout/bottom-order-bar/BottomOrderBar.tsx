'use client';

import { type FC } from 'react';
import { Stack, Typography } from '@mui/material';
import OrderButton from '@components/shared/order-button/OrderButton';
import Styles from '@components/layout/bottom-order-bar/BottomOrderBar.style';
import { ORDER_LABEL } from '@/components/shared/order-button/OrderButton.const';

const BottomOrderBar: FC = () => (
  <Stack component="aside" aria-label={ORDER_LABEL} sx={Styles.bar}>
    <Stack>
      <Typography variant="body1" sx={Styles.label}>
        טייק אווי ומשלוחים
      </Typography>
      <Typography variant="body2" sx={Styles.hint}>
        הזמנה מהירה עד הבית
      </Typography>
    </Stack>
    <OrderButton size="large" short />
  </Stack>
);

export default BottomOrderBar;
