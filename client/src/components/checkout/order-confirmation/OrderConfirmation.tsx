'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Route } from '@shared/enums/route.enum';
import Styles from '@components/checkout/order-confirmation/OrderConfirmation.style';

type OrderConfirmationProps = {
  orderUuid: string;
};

const OrderConfirmation: FC<OrderConfirmationProps> = ({ orderUuid }) => (
  <Stack sx={Styles.panel}>
    <CheckCircleRoundedIcon sx={Styles.icon} />

    <Typography variant="h2" component="h1" sx={Styles.title}>
      ההזמנה התקבלה!
    </Typography>

    <Typography variant="body1" sx={Styles.note}>
      ההזמנה נשלחה לאישור המסעדה. תוך זמן קצר יישלח אליכם מייל עם אישור ההזמנה. התשלום מתבצע במקום,
      במזומן או באשראי.
    </Typography>

    <Typography variant="body2" sx={Styles.reference}>
      מספר אסמכתא: {orderUuid.slice(0, 8).toUpperCase()}
    </Typography>

    <Button component={NextLink} href={Route.Menu} variant="contained" color="secondary">
      חזרה לתפריט
    </Button>
  </Stack>
);

export default OrderConfirmation;
