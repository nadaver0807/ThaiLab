'use client';

import { type FC, type ReactNode, useState } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

type RtlCacheProviderProps = {
  children: ReactNode;
};

const RtlCacheProvider: FC<RtlCacheProviderProps> = ({ children }) => {
  const [cache] = useState(() => {
    const emotionCache = createCache({
      key: 'mui-rtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });
    emotionCache.compat = true;

    return emotionCache;
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default RtlCacheProvider;
