import { type FC } from 'react';
import PageSection from '@components/shared/page-section/PageSection';
import ServiceDetails from '@components/services/service-details/ServiceDetails';
import {
  CHEF_AT_HOME_DETAILS,
  CHEF_AT_HOME_IMAGE,
  CHEF_AT_HOME_PARAGRAPHS,
} from '@components/services/chef-at-home/ChefAtHome.const';
import { WHATSAPP_MESSAGE } from '@shared/consts/site.const';

const ChefAtHomePage: FC = () => (
  <PageSection
    title="ארוחות טעימות"
    description="ערב שלם שנבנה סביב המטבח התאילנדי, באווירה אינטימית אצלי בבת שלמה."
  >
    <ServiceDetails
      image={CHEF_AT_HOME_IMAGE}
      imageAlt="ארוחת שף בבית של עופר"
      paragraphs={CHEF_AT_HOME_PARAGRAPHS}
      details={CHEF_AT_HOME_DETAILS}
      whatsappMessage={WHATSAPP_MESSAGE.chefAtHome}
      ctaLabel="לשאול על התאריכים הקרובים"
    />
  </PageSection>
);

export default ChefAtHomePage;
