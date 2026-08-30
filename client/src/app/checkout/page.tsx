import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import CheckoutForm from '@components/checkout/checkout-form/CheckoutForm';

export const metadata: Metadata = {
  title: 'סיום הזמנה',
  description: 'השלמת פרטי ההזמנה — איסוף עצמי או משלוח.',
};

const CheckoutPage = () => (
  <PageSection title="סיום הזמנה" description="עוד כמה פרטים ואנחנו מתחילים להכין.">
    <CheckoutForm />
  </PageSection>
);

export default CheckoutPage;
