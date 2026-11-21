import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import OrderConfirmation from '@components/checkout/order-confirmation/OrderConfirmation';
import PaymentComplete from '@components/checkout/order-confirmation/PaymentComplete';
import { PaymentMethod } from '@shared/enums/payment-method.enum';

export const metadata: Metadata = {
  title: 'ההזמנה התקבלה',
  description: 'אישור קבלת ההזמנה.',
};

type OrderConfirmationPageProps = {
  params: Promise<{ uuid: string }>;
  searchParams: Promise<{ method?: string; payment?: string }>;
};

const OrderConfirmationPage = async ({ params, searchParams }: OrderConfirmationPageProps) => {
  const { uuid } = await params;
  const { method, payment } = await searchParams;

  // חזרה מספק הסליקה — דף תודה סטטי; הסטטוס האמיתי נקבע ב-webhook
  if (payment) {
    return (
      <PageSection title={payment === 'success' ? 'תודה!' : 'התשלום'}>
        <PaymentComplete orderUuid={uuid} isSuccess={payment === 'success'} />
      </PageSection>
    );
  }

  return (
    <PageSection title="תודה על ההזמנה">
      <OrderConfirmation orderUuid={uuid} isCreditCard={method === PaymentMethod.CreditCard} />
    </PageSection>
  );
};

export default OrderConfirmationPage;
