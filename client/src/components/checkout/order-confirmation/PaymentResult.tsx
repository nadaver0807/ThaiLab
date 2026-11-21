import { type FC } from 'react';
import NextLink from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Route } from '@shared/enums/route.enum';
import { SITE } from '@shared/consts/site.const';
import Styles from '@components/checkout/order-confirmation/OrderConfirmation.style';

type PaymentResultProps = {
  orderUuid: string;
  isSuccess: boolean;
};

/** מוצג אחרי החזרה מדף התשלום של ספק הסליקה. */
const PaymentResult: FC<PaymentResultProps> = ({ orderUuid, isSuccess }) => {
  const Icon = isSuccess ? CheckCircleRoundedIcon : ErrorOutlineRoundedIcon;

  return (
    <Stack sx={Styles.panel}>
      <Icon sx={Styles.icon} color={isSuccess ? undefined : 'error'} />

      <Typography variant="h2" component="h1" sx={Styles.title}>
        {isSuccess ? 'התשלום התקבל!' : 'התשלום לא הושלם'}
      </Typography>

      <Typography variant="body1" sx={Styles.note}>
        {isSuccess
          ? 'תודה! ההזמנה עוברת להכנה. נעדכן אתכם כשהיא תהיה בדרך או מוכנה לאיסוף.'
          : `לא חויבתם. אפשר לנסות שוב מהקישור שבמייל, או להתקשר אלינו: ${SITE.phone}.`}
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

export default PaymentResult;
