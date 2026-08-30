'use client';

import { type FC } from 'react';
import { Alert, CircularProgress, Stack, Typography } from '@mui/material';
import { OrderType } from '@shared/enums/order-type.enum';
import { type CheckoutForm } from '@shared/validations/order.validation';
import ThailabTextField from '@components/shared/text-field/ThailabTextField';
import Styles from '@components/checkout/checkout-form/CheckoutForm.style';

type CustomerFieldsProps = {
  orderType: OrderType;
  isLookingUp: boolean;
  isReturningCustomer: boolean;
};

const CustomerFields: FC<CustomerFieldsProps> = ({
  orderType,
  isLookingUp,
  isReturningCustomer,
}) => (
  <Stack sx={Styles.block}>
    <Typography variant="h3" component="h2" sx={Styles.blockTitle}>
      הפרטים שלכם
    </Typography>
    <Typography variant="body2" sx={Styles.hint}>
      הזמנתם מאיתנו בעבר? הזינו את מספר הטלפון והפרטים יושלמו אוטומטית.
    </Typography>

    <Stack sx={Styles.phoneRow}>
      <ThailabTextField<CheckoutForm> name="phone" label="טלפון" type="tel" required />
      {isLookingUp && (
        <Stack sx={Styles.lookupStatus}>
          <CircularProgress size={18} />
          <Typography variant="body2" sx={Styles.hint}>
            מחפש…
          </Typography>
        </Stack>
      )}
    </Stack>

    {isReturningCustomer && (
      <Alert severity="success">מצאנו אתכם! הפרטים מולאו — אפשר לעדכן אותם במידת הצורך.</Alert>
    )}

    <Stack sx={Styles.nameRow}>
      <ThailabTextField<CheckoutForm> name="firstName" label="שם פרטי" required />
      <ThailabTextField<CheckoutForm> name="lastName" label="שם משפחה" />
    </Stack>

    <ThailabTextField<CheckoutForm> name="email" label="אימייל" type="email" required />

    {orderType === OrderType.Delivery && (
      <ThailabTextField<CheckoutForm> name="address" label="כתובת למשלוח" required />
    )}

    <ThailabTextField<CheckoutForm> name="notes" label="הערות להזמנה" multiline minRows={2} />
  </Stack>
);

export default CustomerFields;
