import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';

export const metadata: Metadata = {
  title: 'אודות',
  description: 'הסיפור שמאחורי המסעדה.',
};

const AboutPage = () => <PageSection title="אודות" description="התוכן יתווסף לפי האפיון." />;

export default AboutPage;
