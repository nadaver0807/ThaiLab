'use client';

import { type FC } from 'react';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { DELIVERY_FEE } from '@shared/consts/order.const';
import { OrderType, OrderTypeLabel } from '@shared/enums/order-type.enum';
import Styles from '@components/checkout/checkout-form/CheckoutForm.style';

type OrderTypeFieldProps = {
  value: OrderType;
  onChange: (orderType: OrderType) => void;
};

const OrderTypeField: FC<OrderTypeFieldProps> = ({ value, onChange }) => (
  <Stack sx={Styles.block}>
    <Typography variant="h3" component="h2" sx={Styles.blockTitle}>
      איך תרצו לקבל את ההזמנה?
    </Typography>

    <RadioGroup value={value} onChange={(event) => onChange(event.target.value as OrderType)}>
      <FormControlLabel
        value={OrderType.Pickup}
        control={<Radio />}
        label={`${OrderTypeLabel[OrderType.Pickup]} — ללא תוספת תשלום`}
      />
      <FormControlLabel
        value={OrderType.Delivery}
        control={<Radio />}
        label={`${OrderTypeLabel[OrderType.Delivery]} — ₪${DELIVERY_FEE}`}
      />
    </RadioGroup>
  </Stack>
);

export default OrderTypeField;
