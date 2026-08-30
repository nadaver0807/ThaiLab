'use client';

import { type FC } from 'react';
import { Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DEFAULT_PRICE_KEY } from '@shared/consts/order.const';
import { OrderStatus, OrderStatusLabel } from '@shared/enums/order-status.enum';
import { OrderTypeLabel } from '@shared/enums/order-type.enum';
import { PaymentStatusLabel } from '@shared/enums/payment-status.enum';
import { type OrderSummary } from '@shared/types/order.type';
import Styles from '@components/admin/order-list/OrderList.style';

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

type OrderCardProps = {
  order: OrderSummary;
  isUpdating: boolean;
  onStatusChange: (status: OrderStatus) => void;
};

const OrderCard: FC<OrderCardProps> = ({ order, isUpdating, onStatusChange }) => (
  <Stack sx={Styles.card}>
    <Stack sx={Styles.header}>
      <Stack>
        <Typography variant="body1" sx={Styles.contact}>
          {order.contactName} · {order.contactPhone}
        </Typography>
        <Typography variant="body2" sx={Styles.meta}>
          {order.contactEmail}
        </Typography>
        <Typography variant="body2" sx={Styles.meta}>
          {new Intl.DateTimeFormat('he-IL', DATE_FORMAT).format(new Date(order.createDate))}
        </Typography>
      </Stack>

      <TextField
        select
        size="small"
        label="סטטוס"
        value={order.status}
        disabled={isUpdating}
        sx={Styles.statusSelect}
        onChange={(event) => onStatusChange(event.target.value as OrderStatus)}
      >
        {Object.values(OrderStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {OrderStatusLabel[status]}
          </MenuItem>
        ))}
      </TextField>
    </Stack>

    <Stack sx={Styles.chips}>
      <Chip size="small" variant="outlined" label={OrderTypeLabel[order.type]} />
      <Chip size="small" variant="outlined" label={PaymentStatusLabel[order.paymentStatus]} />
      {order.address && <Chip size="small" variant="outlined" label={order.address} />}
    </Stack>

    <Stack sx={Styles.items}>
      {order.items.map((item) => (
        <Typography key={item.uuid} variant="body2">
          {item.quantity} × {item.dishName}
          {item.priceKey !== DEFAULT_PRICE_KEY && ` (${item.priceKey})`} — ₪
          {item.unitPrice * item.quantity}
        </Typography>
      ))}
    </Stack>

    {order.notes && (
      <Typography variant="body2" sx={Styles.meta}>
        הערות: {order.notes}
      </Typography>
    )}

    <Typography variant="body1" sx={Styles.total}>
      סה״כ ₪{order.totalPrice}
      {order.deliveryFee > 0 && ` (כולל ₪${order.deliveryFee} משלוח)`}
    </Typography>
  </Stack>
);

export default OrderCard;
