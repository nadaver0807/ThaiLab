'use client';

import { type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Typography } from '@mui/material';
import {
  DATA_REQUEST_TYPE_ORDER,
  DataRequestType,
  DataRequestTypeLabel,
} from '@shared/enums/data-request-type.enum';
import { Route } from '@shared/enums/route.enum';
import {
  dataRequestSchema,
  type DataRequestForm as DataRequestFormValues,
} from '@shared/validations/dataRequest.validation';
import useCreateDataRequest from '@/hooks/api/useCreateDataRequest';
import ThailabTextField from '@components/shared/text-field/ThailabTextField';
import ControlledSelect from '@components/shared/select/ControlledSelect';
import ThailabCheckbox from '@components/shared/checkbox/ThailabCheckbox';
import PolicyLink from '@components/shared/checkbox/PolicyLink';
import Styles from '@components/legal/data-request-form/DataRequestForm.style';

const DEFAULT_VALUES: DataRequestFormValues = {
  fullName: '',
  phone: '',
  email: '',
  type: DataRequestType.Delete,
  details: '',
  hasAcceptedPrivacy: false,
};

const TYPE_OPTIONS = DATA_REQUEST_TYPE_ORDER.map((type) => ({
  value: type,
  label: DataRequestTypeLabel[type],
}));

const DataRequestForm: FC = () => {
  const { mutateAsync, isPending, isSuccess, isError, error, data } = useCreateDataRequest();

  const form = useForm<DataRequestFormValues>({
    resolver: zodResolver(dataRequestSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    form.reset(DEFAULT_VALUES);
  });

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit} noValidate sx={Styles.form}>
        <Typography variant="body2" sx={Styles.intro}>
          אפשר לבקש לעיין במידע שנשמר עליכם, לתקן אותו או למחוק אותו. נחזור אליכם לאימות זהות
          ולטיפול בבקשה תוך 30 יום. מידע שהדין מחייב לשמור (כמו רישומי הזמנות) לא יימחק.
        </Typography>

        <ControlledSelect<DataRequestFormValues>
          name="type"
          label="סוג הבקשה"
          options={TYPE_OPTIONS}
        />
        <ThailabTextField<DataRequestFormValues> name="fullName" label="שם מלא" required />
        <ThailabTextField<DataRequestFormValues> name="phone" label="טלפון" type="tel" required />
        <ThailabTextField<DataRequestFormValues>
          name="email"
          label="אימייל"
          type="email"
          required
        />
        <ThailabTextField<DataRequestFormValues>
          name="details"
          label="פרטים נוספים (לא חובה)"
          multiline
          minRows={3}
        />

        <ThailabCheckbox<DataRequestFormValues>
          name="hasAcceptedPrivacy"
          label={
            <>
              קראתי את <PolicyLink href={Route.Privacy}>מדיניות הפרטיות</PolicyLink> ואני מסכים/ה
              שהפרטים יישמשו לטיפול בבקשה
            </>
          }
        />

        {isSuccess && <Alert severity="success">{data.message}</Alert>}
        {isError && <Alert severity="error">{(error as Error).message}</Alert>}

        <Box sx={Styles.actions}>
          <Button type="submit" variant="contained" color="secondary" disabled={isPending}>
            {isPending ? 'שולח…' : 'שליחת הבקשה'}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default DataRequestForm;
