'use client';

import { type FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { buildWhatsappLink } from '@shared/consts/site.const';
import Styles from '@components/services/service-details/ServiceDetails.style';

export type ServiceDetailRow = {
  label: string;
  value: string;
};

type ServiceDetailsProps = {
  image: string;
  imageAlt: string;
  paragraphs: string[];
  details: ServiceDetailRow[];
  whatsappMessage: string;
  ctaLabel: string;
};

const ServiceDetails: FC<ServiceDetailsProps> = ({
  image,
  imageAlt,
  paragraphs,
  details,
  whatsappMessage,
  ctaLabel,
}) => (
  <Box sx={Styles.layout}>
    <Box role="img" aria-label={imageAlt} sx={Styles.image(image)} />
    <Stack sx={Styles.text}>
      {paragraphs.map((paragraph) => (
        <Typography key={paragraph} variant="body1" sx={Styles.paragraph}>
          {paragraph}
        </Typography>
      ))}
      <Typography variant="h3" component="h2" sx={Styles.detailsTitle}>
        איך זה עובד
      </Typography>
      {details.map((detail) => (
        <Stack key={detail.label} sx={Styles.detailRow}>
          <CheckRoundedIcon sx={Styles.detailIcon} />
          <Typography variant="body1">
            <Box component="span" sx={Styles.detailLabel}>
              {detail.label}:{' '}
            </Box>
            {detail.value}
          </Typography>
        </Stack>
      ))}
      <Stack sx={Styles.actions}>
        <Button
          component="a"
          href={buildWhatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          startIcon={<WhatsAppIcon />}
          sx={Styles.whatsappButton}
        >
          {ctaLabel}
        </Button>
      </Stack>
    </Stack>
  </Box>
);

export default ServiceDetails;
