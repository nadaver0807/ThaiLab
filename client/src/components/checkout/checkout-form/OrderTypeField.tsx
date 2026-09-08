'use client';

import { type FC } from 'react';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import {
  DELIVERY_FEE_FAR,
  DELIVERY_FEE_NEAR,
  DELIVERY_MIN_SUBTOTAL,
} from '@shared/consts/delivery.const';
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
        label={`${OrderTypeLabel[OrderType.Delivery]} — ₪${DELIVERY_FEE_NEAR}–₪${DELIVERY_FEE_FAR} לפי הישוב`}
      />
    </RadioGroup>

    {value === OrderType.Delivery && (
      <Typography variant="body2" sx={Styles.hint}>
        מינימום הזמנה למשלוח — ₪{DELIVERY_MIN_SUBTOTAL}. דמי המשלוח נקבעים לפי הישוב שתבחרו.
      </Typography>
    )}
  </Stack>
);

export default OrderTypeField;
