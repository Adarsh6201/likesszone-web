import '../index.css';
import { Suspense } from 'react';
import StoreProvider from '../components/providers/StoreProvider';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Likesszone - Premium Online Shopping Experience',
  description: 'Shop top quality lifestyle products, electronics, apparel, and festival deals on Likesszone.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 antialiased">
        <StoreProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
