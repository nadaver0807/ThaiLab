'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Alert, Box, Button, Stack } from '@mui/material';
import { FormProvider, useWatch } from 'react-hook-form';
import { DELIVERY_MIN_SUBTOTAL } from '@shared/consts/delivery.const';
import { Route } from '@shared/enums/route.enum';
import OrderSummary from '@components/checkout/order-summary/OrderSummary';
import OrderTypeField from '@components/checkout/checkout-form/OrderTypeField';
import PaymentMethodField from '@components/checkout/checkout-form/PaymentMethodField';
import CustomerFields from '@components/checkout/checkout-form/CustomerFields';
import EmptyState from '@components/shared/empty-state/EmptyState';
import useCart from '@/hooks/cart/useCart';
import useCoupon from '@/hooks/checkout/useCoupon';
import CouponField from '@components/checkout/checkout-form/CouponField';
import ScheduleField from '@components/checkout/checkout-form/ScheduleField';
import useCheckout from '@/hooks/checkout/useCheckout';
import Styles from '@components/checkout/checkout-form/CheckoutForm.style';

const CheckoutForm: FC = () => {
  const { items, clear, totals: baseTotals } = useCart();
  const coupon = useCoupon(baseTotals.subtotal);
  const checkout = useCheckout({ items, onSuccess: clear, couponCode: coupon.activeCode });
  const { totals, setQuantity } = useCart(checkout.orderType, checkout.city);
  const scheduledFor = useWatch({ control: checkout.form.control, name: 'scheduledFor' });

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

          <ScheduleField
            value={scheduledFor}
            onChange={(value) => checkout.form.setValue('scheduledFor', value)}
          />

          <CouponField
            appliedCode={coupon.activeCode}
            discount={coupon.discount}
            isPending={coupon.isPending}
            errorMessage={coupon.errorMessage}
            onApply={coupon.apply}
            onRemove={coupon.remove}
          />

          <PaymentMethodField
            value={checkout.paymentMethod}
            isCreditCardEnabled={checkout.isCreditCardEnabled}
            onChange={(method) => checkout.form.setValue('paymentMethod', method)}
          />

          {checkout.errorMessage && <Alert severity="error">{checkout.errorMessage}</Alert>}

          {!totals.isDeliveryAllowed && (
            <Alert severity="warning">
              מינימום ההזמנה למשלוח הוא ₪{DELIVERY_MIN_SUBTOTAL} — חסרים עוד ₪
              {totals.missingForDelivery}. אפשר להוסיף מנות או לבחור איסוף עצמי.
            </Alert>
          )}

          <Box sx={Styles.actions}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              disabled={checkout.isPending || !totals.isDeliveryAllowed}
            >
              {checkout.isPending
                ? 'שולח…'
                : `שליחת הזמנה — ₪${Math.max(0, totals.total - coupon.discount)}`}
            </Button>
          </Box>
        </Box>

        <OrderSummary
          items={items}
          totals={totals}
          orderType={checkout.orderType}
          discount={coupon.discount}
          onQuantityChange={setQuantity}
        />
      </Box>
    </FormProvider>
  );
};

export default CheckoutForm;
