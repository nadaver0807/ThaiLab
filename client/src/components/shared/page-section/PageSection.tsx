'use client';

import { type FC, type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import Styles from '@components/shared/page-section/PageSection.style';

type PageSectionProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

const PageSection: FC<PageSectionProps> = ({ title, description, children }) => (
  <Box component="section" sx={Styles.section}>
    <PageContainer>
      <Typography variant="h1" component="h1">
        {title}
      </Typography>

      {description && (
        <Typography variant="subtitle1" sx={Styles.description}>
          {description}
        </Typography>
      )}

      {children && <Box sx={Styles.content}>{children}</Box>}
    </PageContainer>
  </Box>
);

export default PageSection;
