'use client';

import { type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Route } from '@shared/enums/route.enum';
import {
  contactMessageSchema,
  type ContactMessageForm,
} from '@shared/validations/contact.validation';
import useSendEmail from '@/hooks/api/useSendEmail';
import ThailabTextField from '@/components/shared/text-field/ThailabTextField';
import ThailabCheckbox from '@components/shared/checkbox/ThailabCheckbox';
import PolicyLink from '@components/shared/checkbox/PolicyLink';
import Styles from '@components/contact/contact-form/ContactForm.style';

const DEFAULT_VALUES: ContactMessageForm = {
  fullName: '',
  email: '',
  message: '',
  hasAcceptedPrivacy: false,
};

const ContactForm: FC = () => {
  const { mutateAsync, isPending, isSuccess, isError, error } = useSendEmail();

  const form = useForm<ContactMessageForm>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    form.reset(DEFAULT_VALUES);
  });

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit} noValidate sx={Styles.form}>
        <Typography variant="h3" component="h3" sx={Styles.title}>
          שליחת הודעה
        </Typography>

        <ThailabTextField<ContactMessageForm> name="fullName" label="שם מלא" required />

        <ThailabTextField<ContactMessageForm>
          name="email"
          label="כתובת אימייל"
          type="email"
          required
        />

        <ThailabTextField<ContactMessageForm>
          name="message"
          label="הודעה"
          multiline
          minRows={4}
          required
        />

        <ThailabCheckbox<ContactMessageForm>
          name="hasAcceptedPrivacy"
          label={
            <>
              קראתי את <PolicyLink href={Route.Privacy}>מדיניות הפרטיות</PolicyLink> ואני מסכים/ה
              שהפרטים יישמשו למענה לפנייה
            </>
          }
        />

        {isSuccess && <Alert severity="success">ההודעה נשלחה בהצלחה. נחזור אליכם בהקדם.</Alert>}
        {isError && <Alert severity="error">{(error as Error).message}</Alert>}

        <Box sx={Styles.actions}>
          <Button type="submit" variant="contained" color="secondary" disabled={isPending}>
            {isPending ? 'שולח…' : 'שליחת הודעה'}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ContactForm;
