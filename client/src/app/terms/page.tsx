import { type Metadata } from 'next';
import LegalDocument from '@components/legal/legal-document/LegalDocument';
import { TERMS_OF_SERVICE } from '@components/legal/legal-content/termsOfService.const';

export const metadata: Metadata = {
  title: TERMS_OF_SERVICE.title,
  description: TERMS_OF_SERVICE.description,
};

const Page = () => <LegalDocument content={TERMS_OF_SERVICE} />;

export default Page;
