'use client';

import { type FC } from 'react';
import { Button } from '@mui/material';
import PageSection from '@components/shared/page-section/PageSection';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage: FC<ErrorPageProps> = ({ reset }) => (
  <PageSection title="אירעה שגיאה" description="משהו השתבש. אפשר לנסות שוב.">
    <Button variant="contained" onClick={reset}>
      נסה שוב
    </Button>
  </PageSection>
);

export default ErrorPage;
