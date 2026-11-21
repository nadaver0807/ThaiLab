import { type Metadata } from 'next';
import PageSection from '@components/shared/page-section/PageSection';
import OrderConfirmation from '@components/checkout/order-confirmation/OrderConfirmation';
import PaymentResult from '@components/checkout/order-confirmation/PaymentResult';
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

  // חזרה מספק הסליקה — הסטטוס האמיתי נקבע ב-webhook, כאן רק מציגים הודעה
  if (payment) {
    const isSuccess = payment === 'success';

    return (
      <PageSection title={isSuccess ? 'תודה על התשלום' : 'התשלום לא הושלם'}>
        <PaymentResult orderUuid={uuid} isSuccess={isSuccess} />
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
