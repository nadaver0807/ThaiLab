'use client';

import { type FC } from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import LinkButton from '@components/shared/link-button/LinkButton';
import { type ServiceOption } from '@shared/consts/service.const';
import Styles from '@components/home/service-options/ServiceOptionCard.style';

type ServiceOptionCardProps = {
  option: ServiceOption;
};

const ServiceOptionCard: FC<ServiceOptionCardProps> = ({ option }) => (
  <Paper elevation={0} sx={Styles.card}>
    <Box role="img" aria-label={option.title} sx={Styles.image(option.image)} />
    <Stack sx={Styles.body}>
      <Chip
        size="small"
        color={option.isSelfService ? 'secondary' : 'default'}
        variant={option.isSelfService ? 'filled' : 'outlined'}
        label={option.isSelfService ? 'הזמנה באתר' : 'בתיאום אישי'}
        sx={Styles.badge}
      />
      <Typography variant="h3" component="h3" sx={Styles.title}>
        {option.title}
      </Typography>
      <Typography variant="body1" sx={Styles.summary}>
        {option.summary}
      </Typography>
      <Stack sx={Styles.highlights}>
        {option.highlights.map((highlight) => (
          <Stack key={highlight} sx={Styles.highlight}>
            <CheckRoundedIcon sx={Styles.highlightIcon} />
            <Typography variant="body2">{highlight}</Typography>
          </Stack>
        ))}
      </Stack>
      <Box sx={Styles.action}>
        <LinkButton href={option.href} variant={option.isSelfService ? 'contained' : 'outlined'}>
          {option.ctaLabel}
        </LinkButton>
      </Box>
    </Stack>
  </Paper>
);

export default ServiceOptionCard;
