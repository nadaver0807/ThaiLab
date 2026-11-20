'use client';

import { type FC } from 'react';
import { Stack } from '@mui/material';
import { Route } from '@shared/enums/route.enum';
import { type CheckoutForm } from '@shared/validations/order.validation';
import { MINIMUM_AGE } from '@shared/consts/legal.const';
import ThailabCheckbox from '@components/shared/checkbox/ThailabCheckbox';
import PolicyLink from '@components/shared/checkbox/PolicyLink';
import Styles from '@components/checkout/checkout-form/CheckoutForm.style';

/** הסכמות חובה לפני שליחת הזמנה. התיבות לא מסומנות מראש. */
const CheckoutConsent: FC = () => (
  <Stack sx={Styles.consent}>
    <ThailabCheckbox<CheckoutForm>
      name="hasAcceptedTerms"
      label={
        <>
          קראתי ואני מסכים/ה ל<PolicyLink href={Route.Terms}>תנאי השימוש</PolicyLink>, ל
          <PolicyLink href={Route.RefundPolicy}>מדיניות הביטולים</PolicyLink> ול
          <PolicyLink href={Route.Privacy}>מדיניות הפרטיות</PolicyLink>
        </>
      }
    />
    <ThailabCheckbox<CheckoutForm>
      name="isAdult"
      label={`אני מצהיר/ה שאני בן/בת ${MINIMUM_AGE} ומעלה`}
    />
  </Stack>
);

export default CheckoutConsent;
