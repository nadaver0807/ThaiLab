import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import AdminLogin from '@components/admin/admin-login/AdminLogin';

export const metadata: Metadata = {
  title: 'ניהול',
  robots: { index: false, follow: false },
};

const AdminPage = () => (
  <PageSection title="ניהול">
    <AdminLogin />
  </PageSection>
);

export default AdminPage;
