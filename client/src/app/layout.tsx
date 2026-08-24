import { type Metadata } from 'next';
import { type ReactNode } from 'react';
import { Heebo } from 'next/font/google';
import { Box } from '@mui/material';
import Providers from '@theme/Providers';
import Header from '@components/layout/header/Header';
import Footer from '@components/layout/footer/Footer';
import BottomOrderBar from '@components/layout/bottom-order-bar/BottomOrderBar';
import Styles from '@/app/RootLayout.style';
import { SITE } from '@shared/consts/site.const';

const heebo = Heebo({
  variable: '--font-sans',
  subsets: ['hebrew', 'latin'],
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
  <html lang="he" dir="rtl" className={heebo.variable}>
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
      </Providers>
    </body>
  </html>
);

export default RootLayout;
