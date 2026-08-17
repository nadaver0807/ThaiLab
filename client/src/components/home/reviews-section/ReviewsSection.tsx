'use client';

import { type FC } from 'react';
import { Box, Rating, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import Styles from '@components/home/reviews-section/ReviewsSection.style';
import { REVIEWS } from '@components/home/reviews-section/ReviewsSection.const';

const ReviewsSection: FC = () => (
  <Box component="section" sx={Styles.section}>
    <PageContainer>
      <Typography variant="h2" component="h2" sx={Styles.title}>
        מה הלקוחות מספרים
      </Typography>

      <Stack sx={Styles.cards}>
        {REVIEWS.map((review) => (
          <Box key={review.id} sx={Styles.card}>
            <Rating value={review.rating} readOnly size="small" />

            <Typography variant="body1" sx={Styles.content}>
              {review.content}
            </Typography>

            <Typography variant="body2" sx={Styles.author}>
              {review.author}
            </Typography>
          </Box>
        ))}
      </Stack>
    </PageContainer>
  </Box>
);

export default ReviewsSection;
