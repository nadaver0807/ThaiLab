'use client';

import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import PageContainer from '@components/shared/page-container/PageContainer';
import { GALLERY_IMAGES } from '@components/home/gallery-section/GallerySection.const';
import Styles from './GallerySection.style';

const GallerySection: FC = () => (
  <Box component="section" id="gallery" sx={Styles.section}>
    <PageContainer>
      <Typography variant="body2" sx={Styles.tagline}>
        Event Gallery
      </Typography>
      <Typography variant="h2" component="h2" sx={Styles.title}>
        רגעים מאירועים פרטיים
      </Typography>
      <Box sx={Styles.grid}>
        {GALLERY_IMAGES.map((item) => (
          <Box key={item.id} role="img" aria-label={item.alt} sx={Styles.tile(item.image)} />
        ))}
      </Box>
    </PageContainer>
  </Box>
);

export default GallerySection;
