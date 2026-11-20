import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import DataRequestForm from '@components/legal/data-request-form/DataRequestForm';

const TITLE = 'בקשה בנושא מידע אישי';

const DESCRIPTION = 'עיון, תיקון או מחיקה של המידע האישי שנשמר אצלנו.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

const Page = () => (
  <PageSection title={TITLE} description={DESCRIPTION}>
    <DataRequestForm />
  </PageSection>
);

export default Page;
