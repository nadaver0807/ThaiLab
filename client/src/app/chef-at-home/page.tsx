import { type Metadata } from 'next';
import ChefAtHomePage from '@components/services/chef-at-home/ChefAtHomePage';

export const metadata: Metadata = {
  title: 'ארוחות טעימות',
  description: 'ערב שלם שנבנה סביב המטבח התאילנדי — ארוחות טעימות אצל עופר שזר בבת שלמה.',
};

const Page = () => <ChefAtHomePage />;

export default Page;
