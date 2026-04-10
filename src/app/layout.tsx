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
  title: {
    default: 'Menucraft | Digital Menu Builder',
    template: '%s | Menucraft',
  },
  description:
    'A full-stack application for restaurant owners to create, manage, and share professional digital menus instantly.',
  keywords: ['restaurant menu', 'digital menu', 'QR menu builder', 'Menucraft', 'restaurant tech'],
  authors: [{name: 'Mahsa', url: 'https://bymahsa.com'}],
  creator: 'Mahsa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/mahsa5731/menucraft',
    title: 'Menucraft | Digital Menu Builder',
    description: 'Create, manage, and share restaurant menus with Menucraft.',
    siteName: 'Menucraft',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menucraft',
    description: 'Professional digital menu builder for modern restaurants.',
    creator: '@mahsa5731',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
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
