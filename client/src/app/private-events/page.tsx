import { type Metadata } from 'next';
import PrivateEventsPage from '@components/services/private-events/PrivateEventsPage';

export const metadata: Metadata = {
  title: 'ThaiLab מגיע אליכם',
  description: 'אירועים וארוחות פרטיות — עופר שזר מגיע עם המטבח שלו ובונה איתכם תפריט.',
};

const Page = () => <PrivateEventsPage />;

export default Page;
