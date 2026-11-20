import { type Metadata } from 'next';
import LegalDocument from '@components/legal/legal-document/LegalDocument';
import { REFUND_POLICY } from '@components/legal/legal-content/refundPolicy.const';

export const metadata: Metadata = {
  title: REFUND_POLICY.title,
  description: REFUND_POLICY.description,
};

const Page = () => <LegalDocument content={REFUND_POLICY} />;

export default Page;
