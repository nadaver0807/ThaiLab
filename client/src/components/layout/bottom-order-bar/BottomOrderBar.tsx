'use client';

import { type FC } from 'react';
import { Stack, Typography } from '@mui/material';
import LinkButton from '@components/shared/link-button/LinkButton';
import Styles from '@components/layout/bottom-order-bar/BottomOrderBar.style';
import { Route } from '@shared/enums/route.enum';

const BottomOrderBar: FC = () => (
  <Stack component="aside" aria-label="פעולת הזמנה מהירה" sx={Styles.bar}>
    <Stack>
      <Typography variant="body1" sx={Styles.label}>
        רוצים להזמין?
      </Typography>
      <Typography variant="body2" sx={Styles.hint}>
        משלוח, איסוף עצמי או ארוחת שף
      </Typography>
    </Stack>
    <LinkButton href={Route.Menu} size="large">
      לתפריט
    </LinkButton>
  </Stack>
);

export default BottomOrderBar;
