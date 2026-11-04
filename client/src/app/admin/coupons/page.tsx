import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import AdminCouponsPanel from '@components/admin/coupon-list/AdminCouponsPanel';

export const metadata: Metadata = {
  title: 'קופונים',
  robots: { index: false, follow: false },
};

const AdminCouponsPage = () => (
  <PageSection title="קופונים" description="יצירה, הפעלה וניהול של קודי הנחה.">
    <AdminCouponsPanel />
  </PageSection>
);

export default AdminCouponsPage;
