'use client';

import { useEffect, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { type Dish } from '@shared/types/site.type';
import { type CreateDishPayload } from '@shared/validations/dish.validation';
import ControlledTextField from '@/components/shared/text-field/ThailabTextField';
import ThailabSelect from '@/components/shared/select/ThailabSelect';
import ThailabSwitch from '@/components/shared/switch/ThailabSwitch';
import {
  CATEGORY_OPTIONS,
  EMPTY_DISH_FORM,
  SPICE_OPTIONS,
  dishFormSchema,
  formatPriceOptions,
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
    const { priceOptionsText, notes, ...rest } = values;

    onSubmit({
      ...rest,
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
            <ControlledTextField<DishFormValues> name="name" label="שם המנה" required />

            <ControlledTextField<DishFormValues>
              name="description"
              label="תיאור"
              multiline
              minRows={3}
            />

            <Stack sx={Styles.row}>
              <ThailabSelect<DishFormValues>
                name="menuCategory"
                label="קטגוריה"
                options={CATEGORY_OPTIONS}
              />
              <ThailabSelect<DishFormValues>
                name="spiceLevel"
                label="רמת חריפות"
                options={SPICE_OPTIONS}
              />
            </Stack>

            <ControlledTextField<DishFormValues>
              name="priceOptionsText"
              label='מחירים — שורה לכל אפשרות, למשל "עוף: 70"'
              multiline
              minRows={2}
              required
            />

            <ControlledTextField<DishFormValues> name="notes" label="הערות" />

            <ControlledTextField<DishFormValues>
              name="displayOrder"
              label="סדר תצוגה"
              type="number"
            />

            <Stack sx={Styles.switches}>
              <ThailabSwitch<DishFormValues> name="isVegetarian" label="צמחוני" />
              <ThailabSwitch<DishFormValues> name="isVegan" label="טבעוני" />
              <ThailabSwitch<DishFormValues> name="isGlutenFree" label="ללא גלוטן" />
              <ThailabSwitch<DishFormValues> name="isAvailable" label="זמין" />
            </Stack>

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
