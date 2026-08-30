'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  closeCartDrawer,
  getIsCartDrawerOpen,
  getServerIsCartDrawerOpen,
  openCartDrawer,
  subscribeToCartDrawer,
} from '@/hooks/cart/cartDrawer.store';

const useCartDrawer = () => {
  const isOpen = useSyncExternalStore(
    subscribeToCartDrawer,
    getIsCartDrawerOpen,
    getServerIsCartDrawerOpen,
  );

  const open = useCallback(() => openCartDrawer(), []);
  const close = useCallback(() => closeCartDrawer(), []);

  return { isOpen, open, close };
};

export default useCartDrawer;
