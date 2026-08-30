'use client';

import { type FC } from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import useCart from '@/hooks/cart/useCart';
import useCartDrawer from '@/hooks/cart/useCartDrawer';
import Styles from '@components/cart/cart-button/CartButton.style';

const CartButton: FC = () => {
  const { itemCount } = useCart();
  const { open } = useCartDrawer();

  return (
    <IconButton aria-label={`פתיחת העגלה, ${itemCount} פריטים`} sx={Styles.button} onClick={open}>
      <Badge badgeContent={itemCount} color="secondary">
        <ShoppingBagRoundedIcon />
      </Badge>
    </IconButton>
  );
};

export default CartButton;
