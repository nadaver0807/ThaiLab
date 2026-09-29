'use client';

import { type FC } from 'react';
import { Box } from '@mui/material';
import {
  MAIN_CONTENT_ID,
  SKIP_LINK_LABEL,
} from '@components/layout/accessibility/Accessibility.const';
import Styles from '@components/layout/accessibility/Accessibility.style';

const SkipToContentLink: FC = () => (
  <Box component="a" href={`#${MAIN_CONTENT_ID}`} sx={Styles.skipLink}>
    {SKIP_LINK_LABEL}
  </Box>
);

export default SkipToContentLink;
