'use client';

import { useState, type FC } from 'react';
import { Button, Chip, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { resolveVariantLabel } from '@shared/util/variant.util';
import QuantityStepper from '@components/cart/quantity-stepper/QuantityStepper';
import useCart from '@/hooks/cart/useCart';
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

  // כל השורות של המנה והווריאציה הזו בעגלה — לכל שילוב הערות שורה נפרדת
  const cartLines = items.filter(
    (item) => item.dishUuid === dishUuid && item.priceKey === priceKey,
  );

  const toggleNote = (note: string): void => {
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
    setSelectedNotes([]);
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

      {cartLines.length > 0 && (
        <Stack sx={Styles.lines}>
          {cartLines.map((line) => (
            <Stack key={line.lineId} sx={Styles.line}>
              <Typography variant="body2" sx={Styles.lineText}>
                {line.selectedNotes?.length ? line.selectedNotes.join(' • ') : 'ללא שינויים'}
              </Typography>

              <QuantityStepper
                quantity={line.quantity}
                label={
                  line.selectedNotes?.length ? `${label} (${line.selectedNotes.join(', ')})` : label
                }
                onChange={(next) => setQuantity(line.lineId, next)}
              />
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default AddToCartRow;
