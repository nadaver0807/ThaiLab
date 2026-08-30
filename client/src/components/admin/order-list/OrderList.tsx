'use client';

import { useState, type FC } from 'react';
import { Alert, CircularProgress, Stack } from '@mui/material';
import { type OrderStatus } from '@shared/enums/order-status.enum';
import EmptyState from '@components/shared/empty-state/EmptyState';
import OrderCard from '@components/admin/order-list/OrderCard';
import useGetOrders from '@/hooks/api/useGetOrders';
import useUpdateOrderStatus from '@/hooks/api/useUpdateOrderStatus';
import Styles from '@components/admin/order-list/OrderList.style';

const OrderList: FC = () => {
  const { data, isLoading, isError } = useGetOrders();
  const { mutate: updateStatus, error } = useUpdateOrderStatus();
  const [updatingUuid, setUpdatingUuid] = useState<string | null>(null);

  const orders = data?.orders ?? [];

  const handleStatusChange = (uuid: string, status: OrderStatus) => {
    setUpdatingUuid(uuid);
    updateStatus({ uuid, status }, { onSettled: () => setUpdatingUuid(null) });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">טעינת ההזמנות נכשלה. נסו לרענן את הדף.</Alert>;
  }

  if (!orders.length) {
    return <EmptyState title="אין הזמנות עדיין" description="הזמנות חדשות יופיעו כאן." />;
  }

  return (
    <Stack sx={Styles.list}>
      {error && <Alert severity="error">{(error as Error).message}</Alert>}

      {orders.map((order) => (
        <OrderCard
          key={order.uuid}
          order={order}
          isUpdating={updatingUuid === order.uuid}
          onStatusChange={(status) => handleStatusChange(order.uuid, status)}
        />
      ))}
    </Stack>
  );
};

export default OrderList;
