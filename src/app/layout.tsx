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
import { ThemeProvider } from '@/components/theme-provider';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Management System',
  description: 'A powerful system for managing students, classes, and academic records.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <RecoilRoot>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ToastContainer />
            </ThemeProvider>
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
