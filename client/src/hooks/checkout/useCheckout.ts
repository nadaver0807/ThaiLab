'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderType } from '@shared/enums/order-type.enum';
import { PaymentMethod } from '@shared/enums/payment-method.enum';
import { Route } from '@shared/enums/route.enum';
import { type CartItem } from '@shared/types/cart.type';
import { checkoutFormSchema, type CheckoutForm } from '@shared/validations/order.validation';
import useCreateOrder from '@/hooks/api/useCreateOrder';
import useLookupCustomer from '@/hooks/api/useLookupCustomer';

const DEFAULT_VALUES: CheckoutForm = {
  type: OrderType.Pickup,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
};

const MIN_LOOKUP_DIGITS = 9;

type UseCheckoutParams = {
  items: CartItem[];
  onSuccess: () => void;
};

type UseCheckoutResult = {
  form: UseFormReturn<CheckoutForm>;
  orderType: OrderType;
  canLookup: boolean;
  isLookingUp: boolean;
  isReturningCustomer: boolean;
  isPending: boolean;
  errorMessage?: string;
  lookup: () => Promise<void>;
  submit: () => Promise<void>;
};

/** לוגיקת עמוד התשלום — טופס, זיהוי לקוח חוזר ושליחת ההזמנה. */
const useCheckout = ({ items, onSuccess }: UseCheckoutParams): UseCheckoutResult => {
  const router = useRouter();
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const orderType = useWatch({ control: form.control, name: 'type' });
  const phone = useWatch({ control: form.control, name: 'phone' });

  const { mutateAsync: submitOrder, isPending, isError, error } = useCreateOrder();
  const { mutateAsync: lookupCustomer, isPending: isLookingUp } = useLookupCustomer();

  /** מילוי מראש של פרטי לקוח חוזר — לפי בקשת המשתמש ולא אוטומטית. */
  const lookup = useCallback(async () => {
    const result = await lookupCustomer(phone);

    setIsReturningCustomer(result.isReturning);

    if (!result.customer) {
      return;
    }

    form.setValue('firstName', result.customer.firstName, { shouldValidate: true });
    form.setValue('lastName', result.customer.lastName ?? '');
    form.setValue('email', result.customer.email);

    if (result.customer.address) {
      form.setValue('address', result.customer.address);
    }
  }, [form, lookupCustomer, phone]);

  const submit = form.handleSubmit(async (values) => {
    const order = await submitOrder({
      type: values.type,
      paymentMethod: PaymentMethod.OnCollection,
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
      },
      address: values.address,
      notes: values.notes,
      items: items.map((item) => ({
        dishUuid: item.dishUuid,
        priceKey: item.priceKey,
        quantity: item.quantity,
        specialRequest: item.specialRequest,
      })),
    });

    onSuccess();
    router.push(`${Route.Checkout}/${order.uuid}`);
  });

  return {
    form,
    orderType,
    canLookup: phone.replace(/\D/g, '').length >= MIN_LOOKUP_DIGITS,
    isLookingUp,
    isReturningCustomer,
    isPending,
    errorMessage: isError ? (error as Error).message : undefined,
    lookup,
    submit,
  };
};

export default useCheckout;
