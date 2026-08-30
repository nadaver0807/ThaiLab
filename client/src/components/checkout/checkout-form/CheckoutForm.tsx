'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { Route } from '@shared/enums/route.enum';
import OrderSummary from '@components/checkout/order-summary/OrderSummary';
import OrderTypeField from '@components/checkout/checkout-form/OrderTypeField';
import CustomerFields from '@components/checkout/checkout-form/CustomerFields';
import EmptyState from '@components/shared/empty-state/EmptyState';
import useCart from '@/hooks/cart/useCart';
import useCheckout from '@/hooks/checkout/useCheckout';
import Styles from '@components/checkout/checkout-form/CheckoutForm.style';

const CheckoutForm: FC = () => {
  const { items, clear } = useCart();
  const checkout = useCheckout({ items, onSuccess: clear });
  const { totals, setQuantity } = useCart(checkout.orderType);

  if (!items.length) {
    return (
      <Stack sx={Styles.empty}>
        <EmptyState title="העגלה ריקה" description="בחרו מנות מהתפריט כדי להתחיל הזמנה." />
        <Button component={NextLink} href={Route.Menu} variant="contained">
          לתפריט
        </Button>
      </Stack>
    );
  }

  return (
    <FormProvider {...checkout.form}>
      <Box sx={Styles.layout}>
        <Box component="form" onSubmit={checkout.submit} noValidate sx={Styles.form}>
          <OrderTypeField
            value={checkout.orderType}
            onChange={(type) => checkout.form.setValue('type', type)}
          />

          <CustomerFields
            orderType={checkout.orderType}
            isLookingUp={checkout.isLookingUp}
            isReturningCustomer={checkout.isReturningCustomer}
          />

          <Stack sx={Styles.block}>
            <Typography variant="h3" component="h2" sx={Styles.blockTitle}>
              תשלום
            </Typography>
            <Typography variant="body2" sx={Styles.paymentNote}>
              התשלום מתבצע במקום — במזומן או באשראי בעת האיסוף או המסירה. תשלום מקוון יתווסף בקרוב.
            </Typography>
          </Stack>

          {checkout.errorMessage && <Alert severity="error">{checkout.errorMessage}</Alert>}

          <Box sx={Styles.actions}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              disabled={checkout.isPending}
            >
              {checkout.isPending ? 'שולח…' : `שליחת הזמנה — ₪${totals.total}`}
            </Button>
          </Box>
        </Box>

        <OrderSummary
          items={items}
          totals={totals}
          orderType={checkout.orderType}
          onQuantityChange={setQuantity}
        />
      </Box>
    </FormProvider>
  );
};

export default CheckoutForm;
