import { type Dish } from '@shared/types/site.type';

export type CartItem = {
  lineId: string;
  dishUuid: string;
  dishName: string;
  variantLabel?: string | null;
  priceKey: string;
  unitPrice: number;
  quantity: number;
  selectedNotes?: string[];
  specialRequest?: string;
};

export type CartTotals = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  missingForDelivery: number;
  isDeliveryAllowed: boolean;
};

export type AddToCartInput = {
  dish: Dish;
  priceKey: string;
};
