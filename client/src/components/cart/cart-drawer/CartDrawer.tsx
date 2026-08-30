'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { DEFAULT_PRICE_KEY } from '@shared/consts/order.const';
import { Route } from '@shared/enums/route.enum';
import QuantityStepper from '@components/cart/quantity-stepper/QuantityStepper';
import useCart from '@/hooks/cart/useCart';
import useCartDrawer from '@/hooks/cart/useCartDrawer';
import Styles from '@components/cart/cart-drawer/CartDrawer.style';

const CartDrawer: FC = () => {
  const { isOpen, close } = useCartDrawer();
  const { items, totals, itemCount, setQuantity, clear } = useCart();

  return (
    <Drawer anchor="left" open={isOpen} onClose={close} slotProps={{ paper: { sx: Styles.paper } }}>
      <Stack sx={Styles.header}>
        <Typography variant="h3" component="h2" sx={Styles.title}>
          העגלה שלי {itemCount > 0 && `(${itemCount})`}
        </Typography>
        <IconButton aria-label="סגירת העגלה" onClick={close}>
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      {items.length === 0 ? (
        <Stack sx={Styles.empty}>
          <Typography variant="body1">העגלה ריקה</Typography>
          <Typography variant="body2">בחרו מנות מהתפריט כדי להתחיל הזמנה.</Typography>
          <Button component={NextLink} href={Route.Menu} variant="contained" onClick={close}>
            לתפריט
          </Button>
        </Stack>
      ) : (
        <>
          <Stack sx={Styles.items}>
            {items.map((item) => (
              <Box key={item.lineId}>
                <Stack sx={Styles.item}>
                  <Box>
                    <Typography variant="body1" sx={Styles.itemName}>
                      {item.dishName}
                    </Typography>
                    {item.priceKey !== DEFAULT_PRICE_KEY && (
                      <Typography variant="body2" sx={Styles.itemOption}>
                        {item.priceKey}
                      </Typography>
                    )}
                  </Box>

                  <QuantityStepper
                    quantity={item.quantity}
                    label={item.dishName}
                    onChange={(next) => setQuantity(item.lineId, next)}
                  />

                  <Typography variant="body1" sx={Styles.itemPrice}>
                    ₪{item.unitPrice * item.quantity}
                  </Typography>
                </Stack>
                <Divider sx={Styles.divider} />
              </Box>
            ))}
          </Stack>

          <Stack sx={Styles.footer}>
            <Stack sx={Styles.totalRow}>
              <Typography variant="body1" sx={Styles.totalLabel}>
                סה״כ
              </Typography>
              <Typography variant="body1" sx={Styles.totalLabel}>
                ₪{totals.subtotal}
              </Typography>
            </Stack>

            <Typography variant="body2" sx={Styles.itemOption}>
              דמי משלוח יתווספו בעמוד התשלום, בהתאם לסוג ההזמנה.
            </Typography>

            <Button
              component={NextLink}
              href={Route.Checkout}
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={close}
            >
              מעבר לתשלום
            </Button>

            <Button size="small" color="inherit" onClick={clear}>
              ניקוי העגלה
            </Button>
          </Stack>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
