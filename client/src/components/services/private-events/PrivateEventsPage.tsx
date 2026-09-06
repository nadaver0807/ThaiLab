import { type FC } from 'react';
import PageSection from '@components/shared/page-section/PageSection';
import ServiceDetails from '@components/services/service-details/ServiceDetails';
import {
  PRIVATE_EVENTS_DETAILS,
  PRIVATE_EVENTS_IMAGE,
  PRIVATE_EVENTS_PARAGRAPHS,
} from '@components/services/private-events/PrivateEvents.const';
import { WHATSAPP_MESSAGE } from '@shared/consts/site.const';

const PrivateEventsPage: FC = () => (
  <PageSection
    title="ThaiLab מגיע אליכם"
    description="אירוע קטן, ארוחה משפחתית, ערב עם חברים או אירוע מיוחד."
  >
    <ServiceDetails
      image={PRIVATE_EVENTS_IMAGE}
      imageAlt="עופר מגיש באירוע פרטי"
      paragraphs={PRIVATE_EVENTS_PARAGRAPHS}
      details={PRIVATE_EVENTS_DETAILS}
      whatsappMessage={WHATSAPP_MESSAGE.privateEvent}
      ctaLabel="לקבלת הצעה בוואטסאפ"
    />
  </PageSection>
);

export default PrivateEventsPage;
