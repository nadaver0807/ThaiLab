import { type MetadataRoute } from 'next';
import { SITE } from '@shared/consts/site.const';
import { Route } from '@shared/enums/route.enum';

const PUBLIC_ROUTES: { route: Route; priority: number }[] = [
  { route: Route.Home, priority: 1 },
  { route: Route.Menu, priority: 0.9 },
  { route: Route.ChefAtHome, priority: 0.8 },
  { route: Route.PrivateEvents, priority: 0.8 },
  { route: Route.About, priority: 0.6 },
  { route: Route.Contact, priority: 0.6 },
  { route: Route.Accessibility, priority: 0.2 },
];

const sitemap = (): MetadataRoute.Sitemap =>
  PUBLIC_ROUTES.map(({ route, priority }) => ({
    url: `${SITE.url}${route === Route.Home ? '' : route}`,
    changeFrequency: 'weekly',
    priority,
  }));

export default sitemap;
