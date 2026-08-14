'use client';

import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import Styles from '@components/home/hero/Hero.style';
import { Route, SITE } from '@thailab/shared';

const Hero: FC = () => (
  <Box component="section" sx={Styles.section}>
    <PageContainer>
      <Typography variant="body2" sx={Styles.tagline}>
        {SITE.tagline}
      </Typography>

      <Typography variant="h1" component="h1" sx={Styles.title}>
        {SITE.name}
      </Typography>

      <Typography variant="subtitle1" sx={Styles.description}>
        {SITE.description}
      </Typography>

      <Stack sx={Styles.actions}>
        <LinkButton href={Route.Menu} size="large">
          לתפריט
        </LinkButton>

        <LinkButton href={Route.Contact} variant="outlined" size="large">
          צור קשר
        </LinkButton>
      </Stack>
    </PageContainer>
  </Box>
);

export default Hero;
