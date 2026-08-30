import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import OrderConfirmation from '@components/checkout/order-confirmation/OrderConfirmation';

export const metadata: Metadata = {
  title: 'ההזמנה התקבלה',
  description: 'אישור קבלת ההזמנה.',
};

type OrderConfirmationPageProps = {
  params: Promise<{ uuid: string }>;
};

const OrderConfirmationPage = async ({ params }: OrderConfirmationPageProps) => {
  const { uuid } = await params;

  return (
    <PageSection title="תודה על ההזמנה">
      <OrderConfirmation orderUuid={uuid} />
    </PageSection>
  );
};

export default OrderConfirmationPage;
