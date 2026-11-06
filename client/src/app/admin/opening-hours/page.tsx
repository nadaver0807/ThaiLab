import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import AdminOpeningHoursPanel from '@components/admin/opening-hours/AdminOpeningHoursPanel';

export const metadata: Metadata = {
  title: 'שעות פעילות',
  robots: { index: false, follow: false },
};

const AdminOpeningHoursPage = () => (
  <PageSection
    title="שעות פעילות"
    description="השעות קובעות אילו חלונות הזמנה מתוזמנת הלקוחות יכולים לבחור."
  >
    <AdminOpeningHoursPanel />
  </PageSection>
);

export default AdminOpeningHoursPage;
