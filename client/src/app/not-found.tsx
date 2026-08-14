import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import LinkButton from '@components/shared/link-button/LinkButton';
import { Route } from '@shared/enums/index.enum';

export const metadata: Metadata = {
  title: 'הדף לא נמצא',
};

const NotFoundPage = () => (
  <PageSection title="הדף לא נמצא" description="הכתובת שביקשת אינה קיימת.">
    <LinkButton href={Route.Home}>חזרה לדף הבית</LinkButton>
  </PageSection>
);

export default NotFoundPage;
