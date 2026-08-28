'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Button } from '@mui/material';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import Styles from '@components/shared/order-button/OrderButton.style';
import {
  ORDER_HREF,
  ORDER_LABEL,
  ORDER_LABEL_SHORT,
} from '@components/shared/order-button/OrderButton.const';

type OrderButtonProps = {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  short?: boolean;
};

const OrderButton: FC<OrderButtonProps> = ({ size = 'medium', fullWidth = false, short = false }) => (
  <Button
    component={NextLink}
    href={ORDER_HREF}
    variant="contained"
    color="secondary"
    size={size}
    fullWidth={fullWidth}
    startIcon={<DeliveryDiningRoundedIcon sx={Styles.icon} />}
    sx={Styles.button}
  >
    {short ? ORDER_LABEL_SHORT : ORDER_LABEL}
  </Button>
);

export default OrderButton;
