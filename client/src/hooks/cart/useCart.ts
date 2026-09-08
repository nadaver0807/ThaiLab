'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { OrderType } from '@shared/enums/order-type.enum';
import { type CartItem } from '@shared/types/cart.type';
import {
  addToCart,
  calculateTotals,
  clearCart,
  getCartItems,
  getServerCartItems,
  removeFromCart,
  setCartItemQuantity,
  subscribeToCart,
} from '@/hooks/cart/cart.store';

const useCart = (orderType: OrderType = OrderType.Pickup, city?: string | null) => {
  const items = useSyncExternalStore(subscribeToCart, getCartItems, getServerCartItems);

  const totals = useMemo(
    () => calculateTotals(items, orderType, city),
    [items, orderType, city],
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const add = useCallback((item: Omit<CartItem, 'lineId'>) => addToCart(item), []);

  const setQuantity = useCallback(
    (lineId: string, quantity: number) => setCartItemQuantity(lineId, quantity),
    [],
  );

  const remove = useCallback((lineId: string) => removeFromCart(lineId), []);

  const clear = useCallback(() => clearCart(), []);

  return { items, totals, itemCount, add, setQuantity, remove, clear };
};

export default useCart;
