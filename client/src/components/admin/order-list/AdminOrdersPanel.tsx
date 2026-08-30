'use client';

import { type FC } from 'react';
import { Alert } from '@mui/material';
import OrderList from '@components/admin/order-list/OrderList';
import useGetDishes from '@/hooks/api/useGetDishes';
import useAuth from '@/hooks/auth/useAuth';

/** שומר הרשאות — ההזמנות נטענות רק כשהמשתמש מחובר כמנהל. */
const AdminOrdersPanel: FC = () => {
  const { userEmail } = useAuth();
  const { data } = useGetDishes();

  if (!userEmail || !data?.isAdmin) {
    return <Alert severity="info">יש להתחבר כמנהל כדי לצפות בהזמנות.</Alert>;
  }

  return <OrderList />;
};

export default AdminOrdersPanel;
