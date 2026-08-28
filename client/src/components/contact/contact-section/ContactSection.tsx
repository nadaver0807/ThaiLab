'use client';

import { type FC } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { SITE } from '@shared/consts/site.const';
import { OPENING_HOURS } from '@components/layout/footer/Footer.const';
import ContactForm from '@components/contact/contact-form/ContactForm';
import Styles from '@components/contact/contact-section/ContactSection.style';

const ContactSection: FC = () => (
  <Box sx={Styles.layout}>
    <Box sx={Styles.details}>
      <Box sx={Styles.group}>
        <Typography variant="h3" component="h3" sx={Styles.groupTitle}>
          טלפון
        </Typography>
        <Link href={`tel:${SITE.phone}`} sx={Styles.phoneLink}>
          {SITE.phone}
        </Link>
      </Box>

      <Box sx={Styles.group}>
        <Typography variant="h3" component="h3" sx={Styles.groupTitle}>
          כתובת לאיסוף עצמי
        </Typography>
        <Typography variant="body1">{SITE.address}</Typography>
      </Box>

      <Box sx={Styles.group}>
        <Typography variant="h3" component="h3" sx={Styles.groupTitle}>
          שעות משלוחים ואיסוף עצמי
        </Typography>
        {OPENING_HOURS.map((row) => (
          <Typography key={row.days} variant="body1">
            {row.days}: {row.hours}
          </Typography>
        ))}
      </Box>
    </Box>

    <ContactForm />
  </Box>
);

export default ContactSection;
