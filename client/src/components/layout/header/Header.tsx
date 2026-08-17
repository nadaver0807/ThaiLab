'use client';

import { type FC } from 'react';
import { AppBar, Stack, Toolbar } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import NavLink from '@components/shared/nav-link/NavLink';
import LinkButton from '@components/shared/link-button/LinkButton';
import Styles from '@components/layout/header/Header.style';
import { NAV_LINKS, SITE } from '@shared/consts/site.const';
import { Route } from '@shared/enums/route.enum';

const Header: FC = () => (
  <AppBar position="sticky" elevation={0} color="transparent" sx={Styles.appBar}>
    <PageContainer>
      <Toolbar sx={Styles.toolbar} disableGutters>
        <NavLink href={Route.Home} variant="h3">
          {SITE.name}
        </NavLink>

        <Stack component="nav" aria-label="ניווט ראשי" sx={Styles.nav}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </Stack>

        <LinkButton href={Route.Contact}>הזמנת מקום</LinkButton>
      </Toolbar>
    </PageContainer>
  </AppBar>
);

export default Header;
