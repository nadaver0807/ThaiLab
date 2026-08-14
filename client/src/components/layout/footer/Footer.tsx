'use client';

import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import NavLink from '@components/shared/nav-link/NavLink';
import Styles from '@components/layout/footer/Footer.style';
import { NAV_LINKS, SITE } from '@thailab/shared';

const Footer: FC = () => (
  <Box component="footer" sx={Styles.footer}>
    <PageContainer>
      <Box sx={Styles.grid}>
        <Box>
          <Typography variant="h3" component="p">
            {SITE.name}
          </Typography>

          <Typography variant="body2" sx={Styles.tagline}>
            {SITE.tagline}
          </Typography>
        </Box>

        <Stack component="nav" aria-label="ניווט תחתון" sx={Styles.nav}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </Stack>

        <Stack component="address" sx={Styles.address}>
          {SITE.address && <Typography variant="body2">{SITE.address}</Typography>}
          {SITE.phone && <Typography variant="body2">{SITE.phone}</Typography>}
          {SITE.email && <Typography variant="body2">{SITE.email}</Typography>}
        </Stack>
      </Box>
    </PageContainer>

    <Typography variant="body2" sx={Styles.copyright}>
      © {new Date().getFullYear()} {SITE.name}. כל הזכויות שמורות.
    </Typography>
  </Box>
);

export default Footer;
