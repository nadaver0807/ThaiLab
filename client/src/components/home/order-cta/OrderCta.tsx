'use client';

import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import Styles from '@components/home/order-cta/OrderCta.style';
import { Route } from '@shared/enums/route.enum';

const OrderCta: FC = () => (
  <Box component="section" sx={Styles.section}>
    <PageContainer>
      <Typography variant="h2" component="h2" sx={Styles.title}>
        מוכנים להזמין?
      </Typography>

      <Typography variant="subtitle1" sx={Styles.description}>
        בוחרים מנות, מתאימים את רמת החריפות ומקבלים אוכל שיוצא מהמטבח שלי היישר אליכם.
      </Typography>

      <Stack sx={Styles.actions}>
        <LinkButton href={Route.Menu} size="large">
          לתפריט המלא
        </LinkButton>

        <LinkButton href={Route.Contact} variant="outlined" size="large">
          לתיאום אירוע פרטי
        </LinkButton>
      </Stack>
    </PageContainer>
  </Box>
);

export default OrderCta;
