'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PageContainer from '@components/shared/page-container/PageContainer';
import { MENU_LINKS } from '@components/home/menu-links/MenuLinks.const';
import Styles from './MenuLinks.style';

const MenuLinks: FC = () => (
  <Box component="section" id="menus" sx={Styles.section}>
    <PageContainer>
      <Typography variant="body2" sx={Styles.tagline}>
        Event Menus
      </Typography>
      <Typography variant="h2" component="h2" sx={Styles.title}>
        תפריטים לאירועים פרטיים
      </Typography>
      <Stack sx={Styles.cards}>
        {MENU_LINKS.map((link) => (
          <Box key={link.id} component={NextLink} href={link.href} sx={Styles.card(link.tone)}>
            <Typography variant="body2" sx={Styles.cardSubtitle}>
              {link.subtitle}
            </Typography>
            <Typography variant="h3" component="h3" sx={Styles.cardTitle}>
              {link.title}
            </Typography>
            <Typography variant="body1" sx={Styles.cardDescription}>
              {link.description}
            </Typography>
            <Stack sx={Styles.cardAction}>
              <Typography variant="button">לצפייה</Typography>
              <ArrowBackRoundedIcon fontSize="small" />
            </Stack>
          </Box>
        ))}
      </Stack>
    </PageContainer>
  </Box>
);

export default MenuLinks;
