'use client';

import { type FC } from 'react';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { type Dish } from '@shared/types/site.type';
import { SpiceLevel, SpiceLevelLabel } from '@shared/enums/spice-level.enum';
import Styles from '@components/menu/dish-card/DishCard.style';

const DEFAULT_PRICE_KEY = 'default';

type DishCardProps = {
  dish: Dish;
  isAdmin: boolean;
  onEdit: (dish: Dish) => void;
  onDelete: (dish: Dish) => void;
};

const DishCard: FC<DishCardProps> = ({ dish, isAdmin, onEdit, onDelete }) => {
  const priceEntries = Object.entries(dish.priceOptions ?? {});

  return (
    <Box sx={Styles.card}>
      <Stack sx={Styles.header}>
        <Typography variant="h3" component="h3" sx={Styles.name}>
          {dish.name}
        </Typography>
        <Stack sx={Styles.prices}>
          {priceEntries.map(([label, amount]) => (
            <Typography key={label} variant="body1" sx={Styles.price}>
              {label !== DEFAULT_PRICE_KEY && (
                <Typography component="span" variant="body2" sx={Styles.priceLabel}>
                  {label}{' '}
                </Typography>
              )}
              ₪{amount}
            </Typography>
          ))}
        </Stack>
      </Stack>

      {dish.description && (
        <Typography variant="body1" sx={Styles.description}>
          {dish.description}
        </Typography>
      )}

      {dish.notes && (
        <Typography variant="body2" sx={Styles.notes}>
          {dish.notes}
        </Typography>
      )}

      <Stack sx={Styles.tags}>
        {dish.isVegan && <Chip label="טבעוני" size="small" variant="outlined" />}
        {!dish.isVegan && dish.isVegetarian && (
          <Chip label="צמחוני" size="small" variant="outlined" />
        )}
        {dish.isGlutenFree && <Chip label="ללא גלוטן" size="small" variant="outlined" />}
        {dish.spiceLevel !== SpiceLevel.None && (
          <Chip label={SpiceLevelLabel[dish.spiceLevel]} size="small" variant="outlined" />
        )}
      </Stack>

      {isAdmin && (
        <Stack sx={Styles.adminActions}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={() => onEdit(dish)}
          >
            עריכה
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={() => onDelete(dish)}
          >
            מחיקה
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default DishCard;
