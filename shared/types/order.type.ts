import { type OrderStatus } from '@shared/enums/order-status.enum';
import { type OrderType } from '@shared/enums/order-type.enum';
import { type PaymentMethod } from '@shared/enums/payment-method.enum';
import { type PaymentStatus } from '@shared/enums/payment-status.enum';

export type OrderItemSummary = {
  uuid: string;
  dishUuid: string | null;
  dishName: string;
  priceKey: string;
  quantity: number;
  unitPrice: number;
  specialRequest: string | null;
};

export type OrderSummary = {
  uuid: string;
  status: OrderStatus;
  type: OrderType;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  deliveryFee: number;
  totalPrice: number;
  address: string | null;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes: string | null;
  createDate: string;
  items: OrderItemSummary[];
};

export type CustomerLookupResponse = {
  isReturning: boolean;
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    address: string | null;
  };
};

export type GetOrdersResponse = {
  orders: OrderSummary[];
};
