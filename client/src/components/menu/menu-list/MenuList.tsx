'use client';

import { useMemo, useState, type FC } from 'react';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DISH_CATEGORY_ORDER, DishCategoryLabel } from '@shared/enums/dish-category.enum';
import { type Dish } from '@shared/types/site.type';
import { type CreateDishPayload } from '@shared/validations/dish.validation';
import useGetDishes from '@/hooks/api/useGetDishes';
import useCreateDish from '@/hooks/api/useCreateDish';
import useUpdateDish from '@/hooks/api/useUpdateDish';
import useDeleteDish from '@/hooks/api/useDeleteDish';
import EmptyState from '@components/shared/empty-state/EmptyState';
import DishCard from '@components/menu/dish-card/DishCard';
import DishFormDialog from '@components/menu/dish-form-dialog/DishFormDialog';
import Styles from '@components/menu/menu-list/MenuList.style';

const MenuList: FC = () => {
  const { data, isLoading, isError } = useGetDishes();
  const { mutate: createDish, error: createError, isPending: isPendingCreate } = useCreateDish();
  const { mutate: updateDish, error: updateError, isPending: isPendingUpdate } = useUpdateDish();
  const { mutate: deleteDish, error: deleteError } = useDeleteDish();

  const [editedDish, setEditedDish] = useState<Dish | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dishes = useMemo(() => data?.dishes ?? [], [data]);
  const isAdmin = Boolean(data?.isAdmin);

  const groupedDishes = useMemo(
    () =>
      DISH_CATEGORY_ORDER.map((category) => ({
        category,
        dishes: dishes.filter((dish) => dish.menuCategory === category),
      })).filter((group) => group.dishes.length > 0),
    [dishes],
  );

  const openCreateDialog = () => {
    setEditedDish(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (dish: Dish) => {
    setEditedDish(dish);
    setIsDialogOpen(true);
  };

  const handleSubmit = (payload: CreateDishPayload) => {
    if (editedDish) {
      updateDish({ uuid: editedDish.uuid, payload });
    } else {
      createDish(payload);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (dish: Dish) => {
    if (window.confirm(`למחוק את "${dish.name}"?`)) {
      deleteDish(dish.uuid);
    }
  };

  const saveError = createError ?? updateError;

  return (
    <Box>
      {isLoading && <CircularProgress />}

      {isError && <Alert severity="error">טעינת התפריט נכשלה. נסו לרענן את הדף.</Alert>}

      {isAdmin && (
        <Stack sx={Styles.header}>
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateDialog}>
            הוספת מנה
          </Button>
        </Stack>
      )}

      {deleteError && (
        <Alert severity="error" sx={Styles.feedback}>
          {(deleteError as Error).message}
        </Alert>
      )}

      {!isLoading && !isError && !groupedDishes.length && (
        <EmptyState title="התפריט בהכנה" description="המנות יעלו לאתר בקרוב." />
      )}

      {groupedDishes.map((group) => (
        <Box key={group.category} sx={Styles.category}>
          <Typography variant="h2" component="h2" sx={Styles.categoryTitle}>
            {DishCategoryLabel[group.category]}
          </Typography>

          {group.dishes.map((dish) => (
            <DishCard
              key={dish.uuid}
              dish={dish}
              isAdmin={isAdmin}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      ))}

      {isAdmin && (
        <DishFormDialog
          isOpen={isDialogOpen}
          dish={editedDish}
          isSaving={isPendingCreate || isPendingUpdate}
          errorMessage={saveError ? (saveError as Error).message : undefined}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};

export default MenuList;
