'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Route } from '@shared/enums/route.enum';
import Styles from '@components/checkout/order-confirmation/OrderConfirmation.style';

type PaymentCompleteProps = {
  orderUuid: string;
  isSuccess: boolean;
};

/**
 * דף החזרה מ-Grow. סטטי בכוונה — הסטטוס האמיתי נקבע ב-webhook,
 * ולכן אין כאן קריאה לשרת שעלולה להיכשל.
 */
const PaymentComplete: FC<PaymentCompleteProps> = ({ orderUuid, isSuccess }) => (
  <Stack sx={Styles.panel}>
    {isSuccess ? (
      <CheckCircleRoundedIcon sx={Styles.icon} />
    ) : (
      <ErrorRoundedIcon sx={Styles.icon} color="error" />
    )}

    <Typography variant="h2" component="h1" sx={Styles.title}>
      {isSuccess ? 'התשלום התקבל, תודה!' : 'התשלום לא הושלם'}
    </Typography>

    <Typography variant="body1" sx={Styles.note}>
      {isSuccess
        ? 'ההזמנה שלכם שולמה ונכנסת להכנה. אישור התשלום יישלח אליכם במייל.'
        : 'לא חויבתם. אפשר לנסות שוב דרך הקישור לתשלום שנשלח אליכם במייל, או ליצור איתנו קשר.'}
    </Typography>

    <Typography variant="body2" sx={Styles.reference}>
      מספר אסמכתא: {orderUuid.slice(0, 8).toUpperCase()}
    </Typography>

    <Button component={NextLink} href={Route.Home} variant="contained" color="secondary">
      חזרה לדף הבית
    </Button>
  </Stack>
);

export default PaymentComplete;
