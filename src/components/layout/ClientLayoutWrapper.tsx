'use client';

import {usePathname} from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function ClientLayoutWrapper({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isPublicMenu = pathname?.startsWith('/menu/');

  if (isPublicMenu) {
    return <main className="bg-base-200 min-h-screen">{children}</main>;
  }

  if (isDashboardPage) {
    return (
      <ProtectedRoute>
        <div className="drawer lg:drawer-open">
          <input id="main-drawer" type="checkbox" className="drawer-toggle" />
          <Sidebar />
          <div className="drawer-content bg-base-100 text-base-content flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6">{children}</main>
            <Footer />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="bg-base-100 text-base-content flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
