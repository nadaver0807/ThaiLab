import { type Metadata } from 'next';
import AboutMe from '@/app/about/AboutMe';

export const metadata: Metadata = {
  title: 'אודות',
  description: 'נעים מאוד, אני עופר שזר — הסיפור שמאחורי ThaiLab והדרך שלי למטבח התאילנדי.',
};

const Page = () => <AboutMe />;

export default Page;
