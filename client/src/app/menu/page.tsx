import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import MenuList from '@components/menu/menu-list/MenuList';

export const metadata: Metadata = {
  title: 'תפריט',
  description: 'התפריט המלא של המסעדה — מנות תאילנדיות אותנטיות.',
};

const MenuPage = () => (
  <PageSection title="תפריט">
    <MenuList />
  </PageSection>
);

export default MenuPage;
