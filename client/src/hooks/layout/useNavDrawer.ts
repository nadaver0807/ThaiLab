'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  closeNavDrawer,
  getIsNavDrawerOpen,
  getServerIsNavDrawerOpen,
  openNavDrawer,
  subscribeToNavDrawer,
} from '@/hooks/layout/navDrawer.store';

const useNavDrawer = () => {
  const isOpen = useSyncExternalStore(
    subscribeToNavDrawer,
    getIsNavDrawerOpen,
    getServerIsNavDrawerOpen,
  );

  const open = useCallback(() => openNavDrawer(), []);
  const close = useCallback(() => closeNavDrawer(), []);

  return { isOpen, open, close };
};

export default useNavDrawer;
