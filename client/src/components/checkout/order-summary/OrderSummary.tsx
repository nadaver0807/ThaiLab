'use client';

import { type FC } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { OrderType } from '@shared/enums/order-type.enum';
import { type CartItem, type CartTotals } from '@shared/types/cart.type';
import QuantityStepper from '@components/cart/quantity-stepper/QuantityStepper';
import Styles from '@components/checkout/order-summary/OrderSummary.style';

type OrderSummaryProps = {
  items: CartItem[];
  totals: CartTotals;
  orderType: OrderType;
  onQuantityChange: (lineId: string, quantity: number) => void;
};

const OrderSummary: FC<OrderSummaryProps> = ({ items, totals, orderType, onQuantityChange }) => (
  <Stack sx={Styles.panel}>
    <Typography variant="h3" component="h2" sx={Styles.title}>
      סיכום ההזמנה
    </Typography>

    {items.map((item) => (
      <Stack key={item.lineId} sx={Styles.row}>
        <Box>
          <Typography variant="body1" sx={Styles.itemName}>
            {item.dishName}
          </Typography>
          {!!item.variantLabel && (
            <Typography variant="body2" sx={Styles.itemOption}>
              {item.variantLabel}
            </Typography>
          )}
          {!!item.selectedNotes?.length && (
            <Typography variant="body2" sx={Styles.itemOption}>
              {item.selectedNotes.join(' • ')}
            </Typography>
          )}
        </Box>

        <QuantityStepper
          quantity={item.quantity}
          label={item.dishName}
          onChange={(next) => onQuantityChange(item.lineId, next)}
        />

        <Typography variant="body1" sx={Styles.amount}>
          ₪{item.unitPrice * item.quantity}
        </Typography>
      </Stack>
    ))}

    <Divider />

    <Stack sx={Styles.totalRow}>
      <Typography variant="body1">סכום ביניים</Typography>
      <Typography variant="body1" sx={Styles.amount}>
        ₪{totals.subtotal}
      </Typography>
    </Stack>

    {orderType === OrderType.Delivery && (
      <Stack sx={Styles.totalRow}>
        <Typography variant="body1">דמי משלוח</Typography>
        <Typography variant="body1" sx={Styles.amount}>
          ₪{totals.deliveryFee}
        </Typography>
      </Stack>
    )}

    <Divider />

    <Stack sx={Styles.totalRow}>
      <Typography variant="body1" sx={Styles.totalLabel}>
        לתשלום
      </Typography>
      <Typography variant="body1" sx={Styles.totalLabel}>
        ₪{totals.total}
      </Typography>
    </Stack>
  </Stack>
);

export default OrderSummary;
