import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import AdminOrdersPanel from '@components/admin/order-list/AdminOrdersPanel';

export const metadata: Metadata = {
  title: 'הזמנות',
  robots: { index: false, follow: false },
};

const AdminOrdersPage = () => (
  <PageSection title="הזמנות" description="היסטוריית ההזמנות ועדכון סטטוס.">
    <AdminOrdersPanel />
  </PageSection>
);

export default AdminOrdersPage;
