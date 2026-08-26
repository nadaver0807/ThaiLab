import { type Metadata } from 'next';
import AboutMe from '@/app/about/AboutMe';

export const metadata: Metadata = {
  title: 'אודות',
  description: 'הסיפור שמאחורי Thai Lab — שף פרטי, מטבח תאילנדי אותנטי וחוויה קולינרית אישית.',
};

const Page = () => <AboutMe />;

export default Page;
