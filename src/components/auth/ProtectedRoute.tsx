'use client';

import {useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
  const {user, loading} = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, pathname, router, user]);

  if (loading) {
    return (
      <div className="bg-base-100 flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
