'use client';

import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import ServiceOptionCard from '@components/home/service-options/ServiceOptionCard';
import { SERVICE_OPTIONS } from '@shared/consts/service.const';
import Styles from '@components/home/service-options/ServiceOptions.style';

const ServiceOptions: FC = () => (
  <Box component="section" id="services" sx={Styles.section}>
    <PageContainer>
      <Box sx={Styles.intro}>
        <Typography variant="body2" sx={Styles.tagline}>
          מה מזמינים
        </Typography>
        <Typography variant="h2" component="h2" sx={Styles.title}>
          שלוש דרכים לאכול אצלי
        </Typography>
        <Typography variant="body1" sx={Styles.description}>
          כל אחת מהן עובדת אחרת — כדאי לבחור את מה שמתאים לכם לפני שממשיכים.
        </Typography>
      </Box>
      <Box sx={Styles.grid}>
        {SERVICE_OPTIONS.map((option) => (
          <ServiceOptionCard key={option.type} option={option} />
        ))}
      </Box>
    </PageContainer>
  </Box>
);

export default ServiceOptions;
