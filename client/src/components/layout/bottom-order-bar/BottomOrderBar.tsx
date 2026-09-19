'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import { Route } from '@shared/enums/route.enum';
import OrderButton from '@components/shared/order-button/OrderButton';
import useCart from '@/hooks/cart/useCart';
import useCartDrawer from '@/hooks/cart/useCartDrawer';
import Styles from '@components/layout/bottom-order-bar/BottomOrderBar.style';
import { ORDER_LABEL } from '@/components/shared/order-button/OrderButton.const';

const BottomOrderBar: FC = () => {
  const { itemCount, totals } = useCart();
  const { open } = useCartDrawer();

  const hasItems = itemCount > 0;

  return (
    <Stack component="aside" aria-label={ORDER_LABEL} sx={Styles.bar}>
      <Stack
        component={hasItems ? 'button' : 'div'}
        type={hasItems ? 'button' : undefined}
        onClick={hasItems ? open : undefined}
        aria-label={hasItems ? 'צפייה בעגלה' : undefined}
        sx={hasItems ? Styles.summaryButton : Styles.summary}
      >
        <Typography variant="body1" sx={Styles.label}>
          {hasItems ? `${itemCount} פריטים בעגלה` : 'טייק אווי ומשלוחים'}
        </Typography>
        <Typography variant="body2" sx={Styles.hint}>
          {hasItems ? `סה״כ ₪${totals.subtotal} · לצפייה בעגלה` : 'הזמנה מהירה עד הבית'}
        </Typography>
      </Stack>

      {hasItems ? (
        <Button
          component={NextLink}
          href={Route.Checkout}
          variant="contained"
          color="secondary"
          size="large"
        >
          לתשלום
        </Button>
      ) : (
        <OrderButton size="large" short />
      )}
    </Stack>
  );
};

export default BottomOrderBar;
