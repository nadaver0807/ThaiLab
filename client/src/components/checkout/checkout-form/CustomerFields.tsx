'use client';

import { type FC } from 'react';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { OrderType } from '@shared/enums/order-type.enum';
import { type CheckoutForm } from '@shared/validations/order.validation';
import ThailabTextField from '@components/shared/text-field/ThailabTextField';
import Styles from '@components/checkout/checkout-form/CheckoutForm.style';

type CustomerFieldsProps = {
  orderType: OrderType;
  canLookup: boolean;
  isLookingUp: boolean;
  isReturningCustomer: boolean;
  onLookup: () => void;
};

const CustomerFields: FC<CustomerFieldsProps> = ({
  orderType,
  canLookup,
  isLookingUp,
  isReturningCustomer,
  onLookup,
}) => (
  <Stack sx={Styles.block}>
    <Typography variant="h3" component="h2" sx={Styles.blockTitle}>
      הפרטים שלכם
    </Typography>
    <Typography variant="body2" sx={Styles.hint}>
      הזמנתם מאיתנו בעבר? הזינו את מספר הטלפון ונמלא את הפרטים עבורכם.
    </Typography>

    <Stack sx={Styles.phoneRow}>
      <ThailabTextField<CheckoutForm> name="phone" label="טלפון" type="tel" required />
      <Button
        variant="outlined"
        sx={Styles.lookupButton}
        disabled={!canLookup || isLookingUp}
        onClick={onLookup}
      >
        {isLookingUp ? 'מחפש…' : 'מילוי אוטומטי'}
      </Button>
    </Stack>

    {isReturningCustomer && <Alert severity="success">מצאנו אתכם! הפרטים מולאו.</Alert>}

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
