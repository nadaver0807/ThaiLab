import { type Metadata } from 'next';
import LegalDocument from '@components/legal/legal-document/LegalDocument';
import { PRIVACY_POLICY } from '@components/legal/legal-content/privacyPolicy.const';

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.description,
};

const Page = () => <LegalDocument content={PRIVACY_POLICY} />;

export default Page;
