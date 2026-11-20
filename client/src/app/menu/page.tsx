import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import MenuList from '@components/menu/menu-list/MenuList';

export const metadata: Metadata = {
  title: 'תפריט',
  description: 'התפריט של ThaiLab — מנות תאילנדיות לטייק אווי ולמשלוח.',
};

const MenuPage = () => (
  <PageSection title="תפריט">
    <MenuList />
  </PageSection>
);

export default MenuPage;
