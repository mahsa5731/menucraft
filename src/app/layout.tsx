import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import ThemeProvider from '@/components/providers/ThemeProvider';
import {AuthProvider} from '@/context/AuthContext';
import {ModalProvider} from '@/context/ModalContext';
import {ToastProvider} from '@/context/ToastContext';
import QueryProvider from '@/context/QueryProvider';

import './globals.css';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';
import ToastContainer from '@/components/ui/ToastContainer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Menucraft',
  description: 'Create, manage, and share restaurant menus with Menucraft.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <QueryProvider>
            <ToastProvider>
              <AuthProvider>
                <ModalProvider>
                  <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
                </ModalProvider>
              </AuthProvider>
              <ToastContainer />
            </ToastProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
