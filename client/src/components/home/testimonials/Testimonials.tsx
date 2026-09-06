'use client';

import { Suspense, useMemo, useState, type FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import PageContainer from '@components/shared/page-container/PageContainer';
import ReviewCard from '@components/home/testimonials/ReviewCard';
import ReviewFormDialog from '@components/home/testimonials/ReviewFormDialog';
import useGetReviews from '@/hooks/api/useGetReviews';
import Styles from '@components/home/testimonials/Testimonials.style';

const TestimonialsContent: FC = () => {
  const { data, isLoading } = useGetReviews();
  const searchParams = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const reviews = useMemo(() => data?.reviews ?? [], [data]);
  const isAdmin = Boolean(data?.isAdmin);

  // רק מי שהגיע עם הקישור מהמייל (ולכן באמת הזמין) יכול לכתוב ביקורת.
  const orderUuid = searchParams.get('order') ?? '';

  return (
    <Box component="section" id="testimonials" sx={Styles.section}>
      <PageContainer>
        <Box sx={Styles.intro}>
          <Typography variant="body2" sx={Styles.tagline}>
            לקוחות
          </Typography>
          <Typography variant="h2" component="h2" sx={Styles.title}>
            מה אומרים על ThaiLab
          </Typography>
        </Box>
        {isLoading && <CircularProgress />}
        {!isLoading && !!reviews.length && (
          <Box sx={Styles.grid}>
            {reviews.map((review) => (
              <ReviewCard key={review.uuid} review={review} isAdmin={isAdmin} />
            ))}
          </Box>
        )}
        {!!orderUuid && (
          <Box sx={Styles.action}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<RateReviewRoundedIcon />}
              onClick={() => setIsDialogOpen(true)}
            >
              ספרו לי איך היה
            </Button>
          </Box>
        )}
      </PageContainer>
      {!!orderUuid && (
        <ReviewFormDialog
          isOpen={isDialogOpen}
          orderUuid={orderUuid}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </Box>
  );
};

const Testimonials: FC = () => (
  <Suspense fallback={null}>
    <TestimonialsContent />
  </Suspense>
);

export default Testimonials;
