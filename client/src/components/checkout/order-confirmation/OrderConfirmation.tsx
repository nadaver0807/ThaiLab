'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Route } from '@shared/enums/route.enum';
import Styles from '@components/checkout/order-confirmation/OrderConfirmation.style';

type OrderConfirmationProps = {
  orderUuid: string;
};

const OrderConfirmation: FC<OrderConfirmationProps> = ({ orderUuid }) => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('payment');
  const isPaymentFailed = paymentStatus === 'failed';

  if (isPaymentFailed) {
    return (
      <Stack sx={Styles.panel}>
        <CancelRoundedIcon sx={Styles.errorIcon} />

        <Typography variant="h2" component="h1" sx={Styles.title}>
          התשלום לא הושלם
        </Typography>

        <Typography variant="body1" sx={Styles.note}>
          משהו השתבש בתהליך התשלום וההזמנה שלכם טרם אושרה. ניתן לנסות שוב, או ליצור קשר איתנו לעזרה.
        </Typography>

        <Typography variant="body2" sx={Styles.reference}>
          מספר אסמכתא: {orderUuid.slice(0, 8).toUpperCase()}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button component={NextLink} href={Route.Checkout} variant="contained" color="secondary">
            חזרה לתשלום
          </Button>

          <Button component={NextLink} href={Route.Menu} variant="outlined" color="secondary">
            חזרה לתפריט
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={Styles.panel}>
      <CheckCircleRoundedIcon sx={Styles.icon} />

      <Typography variant="h2" component="h1" sx={Styles.title}>
        ההזמנה התקבלה!
      </Typography>

      <Typography variant="body1" sx={Styles.note}>
        {paymentStatus === 'success'
          ? 'התשלום בוצע בהצלחה וההזמנה נשלחה לאישור המסעדה. תוך זמן קצר יישלח אליכם מייל עם אישור ההזמנה.'
          : 'ההזמנה נשלחה לאישור המסעדה. תוך זמן קצר יישלח אליכם מייל עם אישור ההזמנה. התשלום מתבצע במקום, במזומן או באשראי.'}
      </Typography>

      <Typography variant="body2" sx={Styles.reference}>
        מספר אסמכתא: {orderUuid.slice(0, 8).toUpperCase()}
      </Typography>

      <Button component={NextLink} href={Route.Menu} variant="contained" color="secondary">
        חזרה לתפריט
      </Button>
    </Stack>
  );
};

export default OrderConfirmation;
