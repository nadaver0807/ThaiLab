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
  const [addedLineId, setAddedLineId] = useState<string | null>(null);

  const variantLabel = resolveVariantLabel(priceKey);
  const label = variantLabel ? `${dishName} — ${variantLabel}` : dishName;
  const lineId = buildLineId(dishUuid, priceKey, selectedNotes);
  const activeLineId = addedLineId ?? lineId;
  const quantity = items.find((item) => item.lineId === activeLineId)?.quantity ?? 0;

  const toggleNote = (note: string): void => {
    // סימון הערה מתחיל הרכבה של פריט חדש ולא משנה את זה שכבר נוסף
    setAddedLineId(null);
    setSelectedNotes((current) =>
      current.includes(note) ? current.filter((item) => item !== note) : [...current, note],
    );
  };

  const handleAdd = (): void => {
    add({
      dishUuid,
      dishName,
      variantLabel,
      priceKey,
      unitPrice,
      quantity: 1,
      selectedNotes,
    });

    // הפריט הבא מתחיל מדף חלק — ההערות לא נגררות להזמנה הבאה
    setAddedLineId(lineId);
    setSelectedNotes([]);
  };

  const handleQuantityChange = (next: number): void => {
    setQuantity(activeLineId, next);

    if (next <= 0) {
      setAddedLineId(null);
    }
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
          <QuantityStepper quantity={quantity} label={label} onChange={handleQuantityChange} />
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            startIcon={<AddRoundedIcon />}
            sx={Styles.addButton}
            aria-label={`הוספת ${label} לעגלה`}
            onClick={handleAdd}
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
