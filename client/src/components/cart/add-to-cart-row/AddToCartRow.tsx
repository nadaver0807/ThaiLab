'use client';

import { useState, type FC } from 'react';
import { Button, Chip, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { resolveVariantLabel } from '@shared/util/variant.util';
import QuantityStepper from '@components/cart/quantity-stepper/QuantityStepper';
import useCart from '@/hooks/cart/useCart';
import { buildLineId } from '@/hooks/cart/cart.store';
import Styles from '@components/cart/add-to-cart-row/AddToCartRow.style';

type AddToCartRowProps = {
  dishUuid: string;
  dishName: string;
  /** מפתח המחיר הוא הווריאציה עצמה — "עוף", "טופו", "שרימפס". */
  priceKey: string;
  unitPrice: number;
  optionNotes?: string[];
};

const AddToCartRow: FC<AddToCartRowProps> = ({
  dishUuid,
  dishName,
  priceKey,
  unitPrice,
  optionNotes = [],
}) => {
  const { items, add, setQuantity } = useCart();
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const variantLabel = resolveVariantLabel(priceKey);
  const label = variantLabel ? `${dishName} — ${variantLabel}` : dishName;
  const lineId = buildLineId(dishUuid, priceKey, selectedNotes);
  const quantity = items.find((item) => item.lineId === lineId)?.quantity ?? 0;

  const toggleNote = (note: string): void => {
    setSelectedNotes((current) =>
      current.includes(note) ? current.filter((item) => item !== note) : [...current, note],
    );
  };

  return (
    <Stack sx={Styles.wrapper}>
      <Stack sx={Styles.row}>
        <Stack sx={Styles.priceGroup}>
          {variantLabel && (
            <Typography variant="body1" sx={Styles.option}>
              {variantLabel}
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
    </Stack>
  );
};

export default AddToCartRow;
