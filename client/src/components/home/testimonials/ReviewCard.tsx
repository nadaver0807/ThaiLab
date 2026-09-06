'use client';

import { type FC } from 'react';
import { Button, Chip, Paper, Stack, Typography } from '@mui/material';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { ReviewStatus, ReviewStatusLabel } from '@shared/enums/review-status.enum';
import { ServiceTypeLabel } from '@shared/enums/service-type.enum';
import { type Review } from '@shared/types/review.type';
import useUpdateReviewStatus from '@/hooks/api/useUpdateReviewStatus';
import Styles from '@components/home/testimonials/Testimonials.style';

type ReviewCardProps = {
  review: Review;
  isAdmin: boolean;
};

const ReviewCard: FC<ReviewCardProps> = ({ review, isAdmin }) => {
  const { mutate: updateStatus, isPending } = useUpdateReviewStatus();

  const isPendingApproval = review.status === ReviewStatus.Pending;

  return (
    <Paper elevation={0} sx={Styles.card}>
      {isAdmin && isPendingApproval && (
        <Chip
          size="small"
          color="warning"
          label={ReviewStatusLabel[review.status]}
          sx={Styles.pendingChip}
        />
      )}
      <FormatQuoteRoundedIcon sx={Styles.quoteIcon} />
      {review.title && (
        <Typography variant="h3" component="h3">
          {review.title}
        </Typography>
      )}
      <Typography variant="body1" component="blockquote" sx={Styles.quote}>
        {review.content}
      </Typography>
      <Stack>
        <Typography variant="body2" sx={Styles.author}>
          {review.authorName}
        </Typography>
        <Typography variant="body2" sx={Styles.context}>
          {ServiceTypeLabel[review.serviceType]}
        </Typography>
      </Stack>
      {isAdmin && isPendingApproval && (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="contained"
            disabled={isPending}
            onClick={() => updateStatus({ uuid: review.uuid, status: ReviewStatus.Approved })}
          >
            אישור
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={isPending}
            onClick={() => updateStatus({ uuid: review.uuid, status: ReviewStatus.Rejected })}
          >
            דחייה
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default ReviewCard;
