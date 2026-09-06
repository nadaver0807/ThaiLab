'use client';

import { type FC } from 'react';
import { Box, Radio, Stack, Typography } from '@mui/material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import { PaymentMethod } from '@shared/enums/payment-method.enum';
import Styles from './PaymentMethodField.style';

type PaymentMethodFieldProps = {
  value: PaymentMethod;
  /** נקבע לפי ההגדרה בשרת — בלי ספק סליקה מציגים רק תשלום במקום. */
  isCreditCardEnabled: boolean;
  onChange: (method: PaymentMethod) => void;
};

const OPTIONS = [
  {
    method: PaymentMethod.OnCollection,
    title: 'תשלום במקום',
    description: 'מזומן או אשראי בעת האיסוף או המסירה.',
    Icon: StorefrontRoundedIcon,
  },
  {
    method: PaymentMethod.CreditCard,
    title: 'תשלום מאובטח באשראי',
    description: 'מועברים לדף תשלום מאובטח ומשלמים עכשיו.',
    Icon: CreditCardRoundedIcon,
  },
];

const PaymentMethodField: FC<PaymentMethodFieldProps> = ({
  value,
  isCreditCardEnabled,
  onChange,
}) => {
  const options = isCreditCardEnabled
    ? OPTIONS
    : OPTIONS.filter(({ method }) => method === PaymentMethod.OnCollection);

  return (
    <Stack sx={Styles.block}>
      <Typography variant="h3" component="h2" sx={Styles.blockTitle}>
        תשלום
      </Typography>

      <Stack role="radiogroup" aria-label="אמצעי תשלום" sx={Styles.options}>
        {options.map(({ method, title, description, Icon }) => (
          <Box
            key={method}
            role="radio"
            tabIndex={0}
            aria-checked={value === method}
            sx={value === method ? Styles.optionSelected : Styles.option}
            onClick={() => onChange(method)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onChange(method);
              }
            }}
          >
            <Radio checked={value === method} tabIndex={-1} />
            <Icon sx={Styles.icon} />
            <Box>
              <Typography variant="body1" sx={Styles.optionTitle}>
                {title}
              </Typography>
              <Typography variant="body2" sx={Styles.optionDescription}>
                {description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default PaymentMethodField;
