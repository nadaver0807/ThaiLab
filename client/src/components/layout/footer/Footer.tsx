'use client';

import Styles from '@components/layout/footer/Footer.style';
import NavLink from '@components/shared/nav-link/NavLink';
import OrderButton from '@components/shared/order-button/OrderButton';
import PageContainer from '@components/shared/page-container/PageContainer';
import { Box, Stack, Typography } from '@mui/material';
import { NAV_LINKS, SITE } from '@shared/consts/site.const';
import { type FC } from 'react';
import { OPENING_HOURS } from './Footer.const';

const Footer: FC = () => (
  <Box component="footer" id="contact" sx={Styles.footer}>
    <PageContainer>
      <Box sx={Styles.grid}>
        <Box>
          <Typography variant="h3" component="p" sx={Styles.brand}>
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
        <Stack sx={Styles.hours}>
          <Typography variant="h3" component="p" sx={Styles.columnTitle}>
            משלוחים ואיסוף עצמי
          </Typography>
          {OPENING_HOURS.map((row) => (
            <Typography key={row.days} variant="body2">
              {row.days}: {row.hours}
            </Typography>
          ))}
          <Box sx={Styles.orderCta}>
            <OrderButton />
          </Box>
        </Stack>
        <Stack sx={Styles.contact}>
          <Typography variant="h3" component="p" sx={Styles.columnTitle}>
            צור קשר
          </Typography>
          {SITE.address && <Typography variant="body2">{SITE.address}</Typography>}
          {SITE.phone && (
            <Typography
              component="a"
              href={`tel:${SITE.phone}`}
              variant="body1"
              sx={Styles.phoneNumber}
            >
              {SITE.phone}
            </Typography>
          )}
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
