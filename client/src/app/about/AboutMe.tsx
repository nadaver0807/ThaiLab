import { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import LinkButton from '@components/shared/link-button/LinkButton';
import { Route } from '@shared/enums/route.enum';
import {
  ABOUT_CHEF_PARAGRAPHS,
  ABOUT_HERO,
  ABOUT_PLACE_PARAGRAPHS,
  ABOUT_VALUES,
} from '@/app/about/AbouteMe.const';
import Styles from '@/app/about/AboutMe.style';

const AboutMe: FC = () => (
  <PageContainer>
    <Box component="section" sx={Styles.hero}>
      <Box role="img" aria-label="השף של Thai Lab" sx={Styles.heroImage(ABOUT_HERO.image)} />
      <Stack sx={Styles.heroText}>
        <Typography variant="body2" sx={Styles.tagline}>
          {ABOUT_HERO.tagline}
        </Typography>
        <Typography variant="h1" component="h1" sx={Styles.heroTitle}>
          {ABOUT_HERO.title}
        </Typography>
        <Typography variant="subtitle1" sx={Styles.heroSubtitle}>
          {ABOUT_HERO.subtitle}
        </Typography>
      </Stack>
    </Box>

    <Box component="section" sx={Styles.block}>
      <Typography variant="h2" component="h2" sx={Styles.sectionHeading}>
        השף
      </Typography>
      {ABOUT_CHEF_PARAGRAPHS.map((paragraph) => (
        <Typography key={paragraph} variant="body1" sx={Styles.paragraph}>
          {paragraph}
        </Typography>
      ))}
    </Box>

    <Box component="section" sx={Styles.block}>
      <Box sx={Styles.blockDark}>
        <Typography variant="h2" component="h2" sx={Styles.headingLight}>
          המקום
        </Typography>
        {ABOUT_PLACE_PARAGRAPHS.map((paragraph) => (
          <Typography key={paragraph} variant="body1" sx={Styles.paragraphLight}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>

    <Box component="section" sx={Styles.block}>
      <Box sx={Styles.values}>
        {ABOUT_VALUES.map((value) => (
          <Box key={value.id} sx={Styles.valueCard}>
            <Typography variant="h3" component="h3" sx={Styles.valueTitle}>
              {value.title}
            </Typography>
            <Typography variant="body1">{value.description}</Typography>
          </Box>
        ))}
      </Box>
    </Box>

    <Box component="section" sx={Styles.cta}>
      <LinkButton href={Route.Contact} size="large">
        הזמנת אירוע פרטי
      </LinkButton>
      <LinkButton href={Route.Menu} variant="outlined" size="large">
        לתפריטי האירועים
      </LinkButton>
    </Box>
  </PageContainer>
);

export default AboutMe;
