import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import RecoilRoot from '@/components/RecoilRoot';

// Toast notify
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
// global styling
import '@/assets/css/global.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <RecoilRoot>
            {children}
            <ToastContainer />
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
