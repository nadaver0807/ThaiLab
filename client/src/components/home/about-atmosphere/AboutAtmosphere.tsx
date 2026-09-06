'use client';

import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import {
  ABOUT_ATMOSPHERE_IMAGE,
  ABOUT_ATMOSPHERE_PARAGRAPHS,
  ABOUT_ATMOSPHERE_TITLE,
} from '@components/home/about-atmosphere/AboutAtmosphere.const';
import { Route } from '@shared/enums/route.enum';
import Styles from './AboutAtmosphere.style';

const AboutAtmosphere: FC = () => (
  <Box component="section" id="about" sx={Styles.section}>
    <PageContainer>
      <Box sx={Styles.card}>
        <Box sx={Styles.layout}>
          <Box
            role="img"
            aria-label="עופר שזר, השף של ThaiLab"
            sx={Styles.image(ABOUT_ATMOSPHERE_IMAGE)}
          />
          <Stack sx={Styles.text}>
            <Typography variant="body2" sx={Styles.tagline}>
              עופר שזר
            </Typography>
            <Typography variant="h2" component="h2" sx={Styles.title}>
              {ABOUT_ATMOSPHERE_TITLE}
            </Typography>
            {ABOUT_ATMOSPHERE_PARAGRAPHS.map((paragraph) => (
              <Typography key={paragraph} variant="body1" sx={Styles.paragraph}>
                {paragraph}
              </Typography>
            ))}
            <Box sx={Styles.action}>
              <LinkButton href={Route.About}>הסיפור שלי</LinkButton>
            </Box>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  </Box>
);

export default AboutAtmosphere;
