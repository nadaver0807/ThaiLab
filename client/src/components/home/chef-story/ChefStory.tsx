'use client';

import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import Styles from '@components/home/chef-story/ChefStory.style';
import { CHEF_STORY_PARAGRAPHS } from '@components/home/chef-story/ChefStory.const';
import { Route } from '@shared/enums/index.enum';

const ChefStory: FC = () => (
  <Box component="section" sx={Styles.section}>
    <PageContainer>
      <Stack sx={Styles.layout}>
        <Box sx={Styles.image} />

        <Stack sx={Styles.text}>
          <Typography variant="body2" sx={Styles.tagline}>
            הסיפור של השף
          </Typography>

          <Typography variant="h2" component="h2">
            מטבח אחד, זוג ידיים, בלי פשרות
          </Typography>

          {CHEF_STORY_PARAGRAPHS.map((paragraph) => (
            <Typography key={paragraph} variant="body1" sx={Styles.paragraph}>
              {paragraph}
            </Typography>
          ))}

          <Box sx={Styles.action}>
            <LinkButton href={Route.About}>קראו עוד עלינו</LinkButton>
          </Box>
        </Stack>
      </Stack>
    </PageContainer>
  </Box>
);

export default ChefStory;
