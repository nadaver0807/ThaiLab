'use client';

import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import Styles from '@components/home/order-categories/OrderCategories.style';
import { ORDER_CATEGORIES } from '@components/home/order-categories/OrderCategories.const';

const OrderCategories: FC = () => (
  <Box component="section" id="categories" sx={Styles.section}>
    <PageContainer>
      <Typography variant="body2" sx={Styles.tagline}>
        מה מזמינים
      </Typography>
      <Typography variant="h2" component="h2" sx={Styles.title}>
        איך תרצו לאכול?
      </Typography>
      <Typography variant="subtitle1" sx={Styles.description}>
        שלוש דרכים ליהנות מהמטבח שלי — בבית שלכם, בארוחה מלאה או באירוע פרטי.
      </Typography>
      <Stack sx={Styles.cards}>
        {ORDER_CATEGORIES.map((category) => (
          <Box key={category.id} sx={Styles.card}>
            <Box sx={Styles.cardImage(category.image)} />
            <Stack sx={Styles.cardBody}>
              <Typography variant="body2" sx={Styles.cardSubtitle}>
                {category.subtitle}
              </Typography>
              <Typography variant="h3" component="h3">
                {category.title}
              </Typography>
              <Typography variant="body1" sx={Styles.cardDescription}>
                {category.description}
              </Typography>
              <Box sx={Styles.cardAction}>
                <LinkButton href={category.href} variant="outlined">
                  {category.actionLabel}
                </LinkButton>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </PageContainer>
  </Box>
);

export default OrderCategories;
