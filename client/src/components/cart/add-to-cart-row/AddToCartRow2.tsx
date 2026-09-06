'use client';

import { useState, type FC } from 'react';
import { Button, Chip, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DEFAULT_PRICE_KEY } from '@shared/consts/order.const';
import { type PriceOptions } from '@shared/types/general.type';
import { getVariantOptions, resolveVariantLabel } from '@shared/util/variant.util';
import QuantityStepper from '@components/cart/quantity-stepper/QuantityStepper';
import useCart from '@/hooks/cart/useCart';
import { buildLineId } from '@/hooks/cart/cart.store';
import Styles from '@components/cart/add-to-cart-row/AddToCartRow.style';

type AddToCartRowProps = {
  dishUuid: string;
  dishName: string;
  priceOptions: PriceOptions;
  optionNotes?: string[];
};

const AddToCartRow: FC<AddToCartRowProps> = ({
  dishUuid,
  dishName,
  priceOptions,
  optionNotes = [],
}) => {
  const { items, add, setQuantity } = useCart();

  // כל אפשרות מחיר היא בחירה — עוף, טופו ושרימפס, גם כשהמחיר זהה
  const variants = getVariantOptions(priceOptions);
  const [priceKey, setPriceKey] = useState(variants[0]?.priceKey ?? DEFAULT_PRICE_KEY);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const unitPrice = priceOptions?.[priceKey] ?? 0;
  const variantLabel = resolveVariantLabel(priceKey);
  const lineId = buildLineId(dishUuid, priceKey, selectedNotes);
  const quantity = items.find((item) => item.lineId === lineId)?.quantity ?? 0;
  const label = variantLabel ? `${dishName} — ${variantLabel}` : dishName;

  const toggleNote = (note: string): void => {
    setSelectedNotes((current) =>
      current.includes(note) ? current.filter((item) => item !== note) : [...current, note],
    );
  };

  return (
    <Stack sx={Styles.wrapper}>
      {variants.length > 0 && (
        <ToggleButtonGroup
          exclusive
          size="small"
          color="secondary"
          value={priceKey}
          aria-label={`בחירת אפשרות עבור ${dishName}`}
          onChange={(_event, value: string | null) => value && setPriceKey(value)}
          sx={Styles.variants}
        >
          {variants.map((variant) => (
            <ToggleButton key={variant.priceKey} value={variant.priceKey} sx={Styles.variantButton}>
              {variant.priceKey}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}

      {optionNotes.length > 0 && (
        <Stack sx={Styles.notes}>
          {optionNotes.map((note) => (
            <Chip
              key={note}
              label={note}
              size="small"
              clickable
              color={selectedNotes.includes(note) ? 'secondary' : 'default'}
              variant={selectedNotes.includes(note) ? 'filled' : 'outlined'}
              aria-pressed={selectedNotes.includes(note)}
              onClick={() => toggleNote(note)}
            />
          ))}
        </Stack>
      )}

      <Stack sx={Styles.row}>
        <Typography variant="body1" sx={Styles.price}>
          ₪{unitPrice}
        </Typography>

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
            onClick={() =>
              add({
                dishUuid,
                dishName,
                variantLabel,
                priceKey,
                unitPrice,
                quantity: 1,
                selectedNotes,
              })
            }
          >
            הוספה
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default AddToCartRow;
