import { type FC } from 'react';
import { SITE } from '@shared/consts/site.const';

/** נתונים מובנים לגוגל — מאפשרים הצגת המסעדה בתוצאות חיפוש מקומיות. */
const RestaurantJsonLd: FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    servesCuisine: 'Thai',
    address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressCountry: 'IL' },
    sameAs: [SITE.social.instagram, SITE.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
};

export default RestaurantJsonLd;
