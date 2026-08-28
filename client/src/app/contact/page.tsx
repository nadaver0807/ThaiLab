import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import ContactSection from '@components/contact/contact-section/ContactSection';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'פרטי התקשרות, שעות פעילות והזמנת מקום.',
};

const ContactPage = () => (
  <PageSection title="צור קשר" description="נשמח לשמוע מכם — בטלפון או בהודעה.">
    <ContactSection />
  </PageSection>
);

export default ContactPage;
