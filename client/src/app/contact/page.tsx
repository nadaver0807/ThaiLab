import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'פרטי התקשרות, שעות פעילות והזמנת מקום.',
};

const ContactPage = () => <PageSection title="צור קשר" description="התוכן יתווסף לפי האפיון." />;

export default ContactPage;
