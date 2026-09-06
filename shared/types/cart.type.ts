import { type Dish } from '@shared/types/site.type';

export type CartItem = {
  lineId: string;
  dishUuid: string;
  dishName: string;
  /** הווריאציה שנבחרה — נשמר במפורש כדי שלא יהיה ספק מה הוזמן. */
  variantLabel?: string | null;
  priceKey: string;
  unitPrice: number;
  quantity: number;
  /** הערות מוכנות שהלקוח סימן. */
  selectedNotes?: string[];
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
