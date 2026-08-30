import { type Dish } from '@shared/types/site.type';

export type CartItem = {
  lineId: string;
  dishUuid: string;
  dishName: string;
  priceKey: string;
  unitPrice: number;
  quantity: number;
  specialRequest?: string;
};

export type CartTotals = {
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export type AddToCartInput = {
  dish: Dish;
  priceKey: string;
};
