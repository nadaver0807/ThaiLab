import { type Metadata } from 'next';
import LegalDocument from '@components/legal/legal-document/LegalDocument';
import { COOKIE_POLICY } from '@components/legal/legal-content/cookiePolicy.const';

export const metadata: Metadata = {
  title: COOKIE_POLICY.title,
  description: COOKIE_POLICY.description,
};

const Page = () => <LegalDocument content={COOKIE_POLICY} />;

export default Page;
