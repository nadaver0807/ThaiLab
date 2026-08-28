'use client';

import { type FC } from 'react';
import { AppBar, IconButton, Stack, Toolbar } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import NextLink from 'next/link';
import Image from 'next/image';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import OrderButton from '@components/shared/order-button/OrderButton';
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
        <NextLink href={Route.Home} aria-label={SITE.name} style={Styles.brandLink}>
          <Image
            src="/images/thailab-label.jpeg"
            alt={SITE.name}
            width={1024}
            height={297}
            priority
            style={Styles.brandImage}
          />
        </NextLink>
        <Stack sx={Styles.actions}>
          <OrderButton />
          <LinkButton href={Route.Contact} variant="outlined" color="primary">
            אירוע פרטי
          </LinkButton>
        </Stack>
      </Toolbar>
    </PageContainer>
  </AppBar>
);

export default Header;
