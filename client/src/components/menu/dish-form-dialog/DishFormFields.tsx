'use client';

import { type FC } from 'react';
import { Stack } from '@mui/material';
import ControlledTextField from '@/components/shared/text-field/ThailabTextField';
import ThailabSelect from '@/components/shared/select/ThailabSelect';
import ThailabSwitch from '@/components/shared/switch/ThailabSwitch';
import {
  CATEGORY_OPTIONS,
  SPICE_OPTIONS,
  type DishFormValues,
} from '@components/menu/dish-form-dialog/DishFormDialog.const';
import Styles from '@components/menu/dish-form-dialog/DishFormDialog.style';

const DishFormFields: FC = () => (
  <>
    <ControlledTextField<DishFormValues> name="name" label="שם המנה" required />
    <ControlledTextField<DishFormValues> name="description" label="תיאור" multiline minRows={3} />
    <Stack sx={Styles.row}>
      <ThailabSelect<DishFormValues>
        name="menuCategory"
        label="קטגוריה"
        options={CATEGORY_OPTIONS}
      />
      <ThailabSelect<DishFormValues> name="spiceLevel" label="רמת חריפות" options={SPICE_OPTIONS} />
    </Stack>
    <ControlledTextField<DishFormValues>
      name="priceOptionsText"
      label='מחירים — שורה לכל אפשרות, למשל "עוף/טופו: 65"'
      multiline
      minRows={2}
      required
    />
    <ControlledTextField<DishFormValues>
      name="optionNotesText"
      label='הערות מוכנות — שורה לכל אחת, למשל "בלי כוסברה"'
      multiline
      minRows={2}
    />
    <ControlledTextField<DishFormValues> name="notes" label="הערות" />
    <ControlledTextField<DishFormValues> name="displayOrder" label="סדר תצוגה" type="number" />
    <Stack sx={Styles.switches}>
      <ThailabSwitch<DishFormValues> name="isVegetarian" label="צמחוני" />
      <ThailabSwitch<DishFormValues> name="isVegan" label="טבעוני" />
      <ThailabSwitch<DishFormValues> name="isGlutenFree" label="ללא גלוטן" />
      <ThailabSwitch<DishFormValues> name="isAvailable" label="זמין" />
    </Stack>
  </>
);

export default DishFormFields;
