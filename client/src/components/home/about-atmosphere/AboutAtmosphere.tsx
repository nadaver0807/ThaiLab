'use client';

import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import { ABOUT_ATMOSPHERE_PARAGRAPHS } from '@components/home/about-atmosphere/AboutAtmosphere.const';
import { Route } from '@shared/enums/route.enum';
import Styles from './AboutAtmosphere.style';

const AboutAtmosphere: FC = () => (
  <Box component="section" id="about" sx={Styles.section}>
    <PageContainer>
      <Box sx={Styles.card}>
        <Stack sx={Styles.text}>
          <Typography variant="body2" sx={Styles.tagline}>
            הסיפור והאווירה
          </Typography>
          <Typography variant="h2" component="h2" sx={Styles.title}>
            מתכונים תאילנדיים, אווירה אותנטית
          </Typography>
          {ABOUT_ATMOSPHERE_PARAGRAPHS.map((paragraph) => (
            <Typography key={paragraph} variant="body1" sx={Styles.paragraph}>
              {paragraph}
            </Typography>
          ))}
          <Box sx={Styles.action}>
            <LinkButton href={Route.About}>קראו עוד עלינו</LinkButton>
          </Box>
        </Stack>
      </Box>
    </PageContainer>
  </Box>
);

export default AboutAtmosphere;
