import { type MetadataRoute } from 'next';
import { SITE } from '@shared/consts/site.const';
import { Route } from '@shared/enums/route.enum';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/admin', Route.Checkout, Route.Review],
  },
  sitemap: `${SITE.url}/sitemap.xml`,
});

export default robots;
