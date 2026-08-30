'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderType } from '@shared/enums/order-type.enum';
import { PaymentMethod } from '@shared/enums/payment-method.enum';
import { Route } from '@shared/enums/route.enum';
import { type CartItem } from '@shared/types/cart.type';
import { israeliPhone } from '@shared/validations/common.validation';
import { checkoutFormSchema, type CheckoutForm } from '@shared/validations/order.validation';
import useCreateOrder from '@/hooks/api/useCreateOrder';
import useLookupCustomer from '@/hooks/api/useLookupCustomer';
import useDebouncedValue from '@/hooks/shared/useDebouncedValue';

const DEFAULT_VALUES: CheckoutForm = {
  type: OrderType.Pickup,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
};

const LOOKUP_DEBOUNCE_MS = 500;

const phoneSchema = israeliPhone();

type UseCheckoutParams = {
  items: CartItem[];
  onSuccess: () => void;
};

type UseCheckoutResult = {
  form: UseFormReturn<CheckoutForm>;
  orderType: OrderType;
  isLookingUp: boolean;
  isReturningCustomer: boolean;
  isPending: boolean;
  errorMessage?: string;
  submit: () => Promise<void>;
};

const useCheckout = ({ items, onSuccess }: UseCheckoutParams): UseCheckoutResult => {
  const router = useRouter();
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);

  const filledPhoneRef = useRef<string | null>(null);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const orderType = useWatch({ control: form.control, name: 'type' });
  const phone = useWatch({ control: form.control, name: 'phone' });

  const debouncedPhone = useDebouncedValue(phone, LOOKUP_DEBOUNCE_MS);
  const isPhoneValid = phoneSchema.safeParse(debouncedPhone).success;

  const { data: lookupResult, isFetching: isLookingUp } = useLookupCustomer(
    debouncedPhone,
    isPhoneValid,
  );

  const { mutateAsync: submitOrder, isPending, isError, error } = useCreateOrder();

  useEffect(() => {
    if (!lookupResult || filledPhoneRef.current === debouncedPhone) {
      return;
    }

    filledPhoneRef.current = debouncedPhone;
    setIsReturningCustomer(lookupResult.isReturning);

    const { customer } = lookupResult;

    if (!customer) {
      return;
    }

    form.setValue('firstName', customer.firstName, { shouldValidate: true });
    form.setValue('lastName', customer.lastName ?? '');
    form.setValue('email', customer.email, { shouldValidate: true });

    if (customer.address) {
      form.setValue('address', customer.address);
    }
  }, [lookupResult, debouncedPhone, form]);

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
    isLookingUp,
    isReturningCustomer,
    isPending,
    errorMessage: isError ? (error as Error).message : undefined,
    submit,
  };
};

export default useCheckout;
