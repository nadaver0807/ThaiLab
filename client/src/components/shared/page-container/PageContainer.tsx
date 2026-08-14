'use client';

import { type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import Styles from '@components/shared/page-container/PageContainer.style';

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer: FC<PageContainerProps> = ({ children }) => (
  <Box sx={Styles.container}>{children}</Box>
);

export default PageContainer;
