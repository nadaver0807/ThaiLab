'use client';

import { type FC } from 'react';
import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import Styles from '@components/checkout/payment-redirect-overlay/PaymentRedirectOverlay.style';

type PaymentRedirectOverlayProps = {
  open: boolean;
};

/**
 * מסך ביניים שמוצג בזמן שההזמנה כבר נוצרה והלקוח מועבר לדף התשלום המאובטח
 * של ספק הסליקה. דף התשלום עצמו לעולם לא ניתן להטמעה באתר שלנו (iframe)
 * מטעמי אבטחה אצל הספק — זהו רק מסך מעבר שמונע הרגשה של "קפיצה" פתאומית.
 */
const PaymentRedirectOverlay: FC<PaymentRedirectOverlayProps> = ({ open }) => (
  <Backdrop open={open} sx={Styles.backdrop}>
    <Stack sx={Styles.panel}>
      <CircularProgress color="inherit" size={48} />

      <Typography variant="h3" component="p" sx={Styles.title}>
        מעבירים אותך לדף תשלום מאובטח…
      </Typography>

      <Typography variant="body1" sx={Styles.note}>
        בעוד רגע תועברו לדף התשלום המאובטח של ספק הסליקה. לאחר השלמת התשלום תוחזרו אוטומטית לאתר.
      </Typography>
    </Stack>
  </Backdrop>
);

export default PaymentRedirectOverlay;
