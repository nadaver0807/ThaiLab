'use client';

import { type FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DEFAULT_PRICE_KEY } from '@shared/consts/order.const';
import QuantityStepper from '@components/cart/quantity-stepper/QuantityStepper';
import useCart from '@/hooks/cart/useCart';
import { buildLineId } from '@/hooks/cart/cart.store';
import Styles from '@components/cart/add-to-cart-row/AddToCartRow.style';

type AddToCartRowProps = {
  dishUuid: string;
  dishName: string;
  priceKey: string;
  unitPrice: number;
};

const AddToCartRow: FC<AddToCartRowProps> = ({ dishUuid, dishName, priceKey, unitPrice }) => {
  const { items, add, setQuantity } = useCart();

  const lineId = buildLineId(dishUuid, priceKey);
  const quantity = items.find((item) => item.lineId === lineId)?.quantity ?? 0;

  const hasOptionLabel = priceKey !== DEFAULT_PRICE_KEY;
  const label = hasOptionLabel ? `${dishName} — ${priceKey}` : dishName;

  return (
    <Stack sx={Styles.row}>
      <Stack sx={Styles.priceGroup}>
        {hasOptionLabel && (
          <Typography variant="body2" sx={Styles.option}>
            {priceKey}
          </Typography>
        )}
        <Typography variant="body1" sx={Styles.price}>
          ₪{unitPrice}
        </Typography>
      </Stack>

      {quantity > 0 ? (
        <QuantityStepper
          quantity={quantity}
          label={label}
          onChange={(next) => setQuantity(lineId, next)}
        />
      ) : (
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<AddRoundedIcon />}
          sx={Styles.addButton}
          aria-label={`הוספת ${label} לעגלה`}
          onClick={() => add({ dishUuid, dishName, priceKey, unitPrice, quantity: 1 })}
        >
          הוספה
        </Button>
      )}
    </Stack>
  );
};

export default AddToCartRow;
