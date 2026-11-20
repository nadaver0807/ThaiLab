'use client';

import { useSyncExternalStore } from 'react';
import {
  dismissCookieNotice,
  getIsCookieNoticeDismissed,
  getServerIsCookieNoticeDismissed,
  subscribeToCookieNotice,
} from '@/hooks/consent/cookieNotice.store';

const useCookieNotice = () => {
  const isDismissed = useSyncExternalStore(
    subscribeToCookieNotice,
    getIsCookieNoticeDismissed,
    getServerIsCookieNoticeDismissed,
  );

  return { isVisible: !isDismissed, dismiss: dismissCookieNotice };
};

export default useCookieNotice;
