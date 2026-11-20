'use client';

import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import PageSection from '@components/shared/page-section/PageSection';
import { type LegalContent } from '@components/legal/legal-document/LegalDocument.type';
import Styles from '@components/legal/legal-document/LegalDocument.style';
import { LEGAL_LAST_UPDATED } from '@shared/consts/legal.const';
import { getBusinessDetails } from '@shared/util/business.util';

type LegalDocumentProps = {
  content: LegalContent;
};

/** עמוד מסמך משפטי: כותרת, תאריך עדכון, סעיפים ופרטי העסק. */
const LegalDocument: FC<LegalDocumentProps> = ({ content }) => (
  <PageSection title={content.title} description={content.description}>
    <Typography variant="body2" sx={Styles.updated}>
      עודכן לאחרונה: {LEGAL_LAST_UPDATED}
    </Typography>

    {content.sections.map(({ title, paragraphs }) => (
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

    <Box component="section" sx={Styles.business}>
      <Typography variant="h3" component="h2" sx={Styles.title}>
        פרטי העסק
      </Typography>
      {getBusinessDetails().map((line) => (
        <Typography key={line} variant="body1" sx={Styles.paragraph}>
          {line}
        </Typography>
      ))}
    </Box>
  </PageSection>
);

export default LegalDocument;
