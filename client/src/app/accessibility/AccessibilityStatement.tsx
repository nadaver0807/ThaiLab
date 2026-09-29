import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import PageSection from '@components/shared/page-section/PageSection';
import {
  ACCESSIBILITY_PAGE_DESCRIPTION,
  ACCESSIBILITY_PAGE_TITLE,
  STATEMENT_SECTIONS,
} from '@/app/accessibility/AccessibilityStatement.const';
import Styles from '@/app/accessibility/AccessibilityStatement.style';

const AccessibilityStatement: FC = () => (
  <PageSection title={ACCESSIBILITY_PAGE_TITLE} description={ACCESSIBILITY_PAGE_DESCRIPTION}>
    {STATEMENT_SECTIONS.map(({ title, paragraphs }) => (
      <Box key={title} component="section" sx={Styles.section}>
        <Typography variant="h3" component="h2" sx={Styles.title}>
          {title}
        </Typography>
        {paragraphs.map((paragraph) => (
          <Typography key={paragraph} variant="body1" sx={Styles.paragraph}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    ))}
  </PageSection>
);

export default AccessibilityStatement;
