import Styles from '@/app/RootLayout.style';
import BottomOrderBar from '@components/layout/bottom-order-bar/BottomOrderBar';
import CartDrawer from '@components/cart/cart-drawer/CartDrawer';
import Footer from '@components/layout/footer/Footer';
import Header from '@components/layout/header/Header';
import { Box } from '@mui/material';
import { SITE } from '@shared/consts/site.const';
import Providers from '@theme/Providers';
import { type Metadata } from 'next';
import { Heebo } from 'next/font/google';
import localFont from 'next/font/local';
import { type ReactNode } from 'react';

const heebo = Heebo({
  variable: '--font-sans',
  subsets: ['hebrew', 'latin'],
});

const ozrad = localFont({
  variable: '--font-display',
  src: [{ path: './fonts/OzradCLM-Bold.woff', weight: '700', style: 'normal' }],
  display: 'swap',
});

const chaipot = localFont({
  variable: '--font-brand',
  src: [{ path: './fonts/CRU-Chaipot.woff', weight: '700', style: 'normal' }],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="he" dir="rtl" className={`${heebo.variable} ${ozrad.variable} ${chaipot.variable}`}>
    <body>
      <Providers>
        <Box sx={Styles.layout}>
          <Header />
          <Box component="main" sx={Styles.main}>
            {children}
          </Box>
          <Footer />
        </Box>
        <BottomOrderBar />
        <CartDrawer />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
