'use client';

import { useMemo, type FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import {
  createReviewSchema,
  type CreateReviewPayload,
} from '@shared/validations/review.validation';
import { SERVICE_TYPE_ORDER, ServiceType, ServiceTypeLabel } from '@shared/enums/service-type.enum';
import ThailabTextField from '@components/shared/text-field/ThailabTextField';
import ControlledSelect from '@components/shared/select/ControlledSelect';
import useCreateReview from '@/hooks/api/useCreateReview';
import Styles from '@components/home/testimonials/ReviewFormDialog.style';

const buildDefaultValues = (orderUuid: string): CreateReviewPayload => ({
  authorName: '',
  authorEmail: '',
  serviceType: ServiceType.TakeAwayDelivery,
  rating: 5,
  title: '',
  content: '',
  orderUuid,
});

const SERVICE_OPTIONS = SERVICE_TYPE_ORDER.map((type) => ({
  value: type,
  label: ServiceTypeLabel[type],
}));

type ReviewFormDialogProps = {
  isOpen: boolean;
  orderUuid: string;
  onClose: () => void;
};

const ReviewFormDialog: FC<ReviewFormDialogProps> = ({ isOpen, orderUuid, onClose }) => {
  const { mutateAsync, isPending, isSuccess, isError, error, reset } = useCreateReview();

  const defaultValues = useMemo(() => buildDefaultValues(orderUuid), [orderUuid]);

  const form = useForm<CreateReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues,
  });

  const handleClose = () => {
    form.reset(defaultValues);
    reset();
    onClose();
  };

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    form.reset(defaultValues);
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>איך היה?</DialogTitle>
      <FormProvider {...form}>
        <Box component="form" onSubmit={onSubmit} noValidate>
          <DialogContent sx={Styles.form}>
            {isSuccess ? (
              <Alert severity="success">
                תודה! הביקורת התקבלה ותעלה לאתר אחרי שעופר יאשר אותה.
              </Alert>
            ) : (
              <>
                <ThailabTextField<CreateReviewPayload> name="authorName" label="השם שלך" required />
                <ThailabTextField<CreateReviewPayload>
                  name="authorEmail"
                  label="אימייל (לא יוצג באתר)"
                  type="email"
                  required
                />
                <ControlledSelect<CreateReviewPayload>
                  name="serviceType"
                  label="על מה הביקורת"
                  options={SERVICE_OPTIONS}
                />
                <Stack sx={Styles.ratingRow}>
                  <Typography variant="body2" sx={Styles.ratingLabel}>
                    דירוג
                  </Typography>
                  <Controller
                    name="rating"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Rating
                          value={Number(field.value)}
                          onChange={(_event, value) => field.onChange(value ?? 0)}
                        />
                        {fieldState.error && (
                          <Typography variant="body2" sx={Styles.ratingError}>
                            {fieldState.error.message}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Stack>
                <ThailabTextField<CreateReviewPayload> name="title" label="כותרת (לא חובה)" />
                <ThailabTextField<CreateReviewPayload>
                  name="content"
                  label="מה בא לך לספר?"
                  multiline
                  minRows={4}
                  required
                />
                {isError && <Alert severity="error">{(error as Error).message}</Alert>}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{isSuccess ? 'סגירה' : 'ביטול'}</Button>
            {!isSuccess && (
              <Button type="submit" variant="contained" color="secondary" disabled={isPending}>
                {isPending ? 'שולח…' : 'שליחת הביקורת'}
              </Button>
            )}
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default ReviewFormDialog;
