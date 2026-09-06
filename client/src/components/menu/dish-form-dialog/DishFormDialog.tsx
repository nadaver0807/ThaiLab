'use client';

import { useEffect, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { type Dish } from '@shared/types/site.type';
import { type CreateDishPayload } from '@shared/validations/dish.validation';
import DishFormFields from '@components/menu/dish-form-dialog/DishFormFields';
import {
  EMPTY_DISH_FORM,
  dishFormSchema,
  formatOptionNotes,
  formatPriceOptions,
  parseOptionNotes,
  parsePriceOptions,
  type DishFormValues,
} from '@components/menu/dish-form-dialog/DishFormDialog.const';
import Styles from '@components/menu/dish-form-dialog/DishFormDialog.style';

type DishFormDialogProps = {
  isOpen: boolean;
  dish: Dish | null;
  isSaving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (payload: CreateDishPayload) => void;
};

const mapDishForm = (dish: Dish | null): DishFormValues =>
  dish
    ? {
        name: dish.name,
        optionNotesText: formatOptionNotes(dish.optionNotes ?? []),
        description: dish.description ?? '',
        menuCategory: dish.menuCategory,
        spiceLevel: dish.spiceLevel,
        priceOptionsText: formatPriceOptions(dish.priceOptions),
        notes: dish.notes ?? '',
        displayOrder: dish.displayOrder,
        isVegetarian: dish.isVegetarian,
        isVegan: dish.isVegan,
        isGlutenFree: dish.isGlutenFree,
        isAvailable: dish.isAvailable,
      }
    : EMPTY_DISH_FORM;

const DishFormDialog: FC<DishFormDialogProps> = ({
  isOpen,
  dish,
  isSaving,
  errorMessage,
  onClose,
  onSubmit,
}) => {
  const form = useForm<DishFormValues>({
    resolver: zodResolver(dishFormSchema),
    defaultValues: EMPTY_DISH_FORM,
  });

  const { reset } = form;

  // טעינת ערכי המנה בכל פתיחה, כדי שהטופס לא ישמור מצב מעריכה קודמת.
  useEffect(() => {
    if (isOpen) {
      reset(mapDishForm(dish));
    }
  }, [isOpen, dish, reset]);

  const handleSubmit = form.handleSubmit(async (values) => {
    const { priceOptionsText, optionNotesText, notes, ...rest } = values;

    onSubmit({
      ...rest,
      optionNotes: parseOptionNotes(optionNotesText),
      notes: notes || null,
      priceOptions: parsePriceOptions(priceOptionsText),
    });
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{dish ? 'עריכת מנה' : 'הוספת מנה'}</DialogTitle>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit} noValidate>
          <DialogContent sx={Styles.content}>
            <DishFormFields />

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} disabled={isSaving}>
              ביטול
            </Button>
            <Button type="submit" variant="contained" color="secondary" disabled={isSaving}>
              {isSaving ? 'שומר…' : 'שמירה'}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default DishFormDialog;
