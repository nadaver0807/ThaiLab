'use client';

import { type FC } from 'react';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import NextLink from 'next/link';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import Styles from '@components/layout/header/Header.style';
import { SITE } from '@shared/consts/site.const';
import { Route } from '@shared/enums/route.enum';

const Header: FC = () => (
  <AppBar position="fixed" elevation={0} color="transparent" sx={Styles.appBar}>
    <PageContainer>
      <Toolbar sx={Styles.toolbar} disableGutters>
        <Stack sx={Styles.side}>
          <IconButton aria-label="פתיחת תפריט" sx={Styles.menuIcon}>
            <MenuRoundedIcon />
          </IconButton>
          <IconButton
            component="a"
            href={SITE.social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="אינסטגרם"
            sx={Styles.socialIcon}
          >
            <InstagramIcon />
          </IconButton>
        </Stack>
        <Typography component={NextLink} href={Route.Home} variant="h3" sx={Styles.brand}>
          {SITE.name}
        </Typography>
        <Stack sx={Styles.actions}>
          <LinkButton href={Route.Menu} variant="contained">
            הזמנת משלוח
          </LinkButton>
          <LinkButton href={Route.Contact} variant="contained">
            הזמנת שולחן
          </LinkButton>
        </Stack>
      </Toolbar>
    </PageContainer>
  </AppBar>
);

export default Header;
