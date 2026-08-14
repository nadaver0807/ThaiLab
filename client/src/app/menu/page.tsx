import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import EmptyState from '@components/shared/empty-state/EmptyState';

export const metadata: Metadata = {
  title: 'תפריט',
  description: 'התפריט המלא של המסעדה — מנות תאילנדיות אותנטיות.',
};

const MenuPage = () => (
  <PageSection title="תפריט">
    <EmptyState title="התפריט בהכנה" description="המנות יעלו לאתר בקרוב." />
  </PageSection>
);

export default MenuPage;
