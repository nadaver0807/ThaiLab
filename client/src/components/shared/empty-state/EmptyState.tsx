'use client';

import { type FC } from 'react';
import { Stack, Typography } from '@mui/material';
import Styles from '@components/shared/empty-state/EmptyState.style';

type EmptyStateProps = {
  title: string;
  description?: string;
};

const EmptyState: FC<EmptyStateProps> = ({ title, description }) => (
  <Stack sx={Styles.wrapper}>
    <Typography variant="h3" component="p">
      {title}
    </Typography>

    {description && (
      <Typography variant="body1" sx={Styles.description}>
        {description}
      </Typography>
    )}
  </Stack>
);

export default EmptyState;
