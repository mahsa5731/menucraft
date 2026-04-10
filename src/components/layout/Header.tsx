'use client';

import Link from 'next/link';
import {LayoutDashboard, LogOut, Menu, UserCircle} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const {user, loading, signOut} = useAuth();
  const pathname = usePathname();

  const isDashboardPage = pathname.startsWith('/dashboard');

  const avatarLabel =
    user?.displayName?.trim()?.charAt(0)?.toUpperCase() || user?.email?.trim()?.charAt(0)?.toUpperCase() || 'U';

  return (
    <nav className="navbar border-base-200 bg-base-300 border-b px-4">
      <div className="flex flex-1 items-center gap-2">
        {user && isDashboardPage ? (
          <label htmlFor="main-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
            <Menu className="size-5" />
          </label>
        ) : null}

        <Link href="/" className="text-lg font-semibold tracking-tight">
          Menucraft
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {!loading && user ? (
          <Link href="/dashboard" className="btn btn-ghost btn-sm hidden sm:inline-flex">
            Dashboard
          </Link>
        ) : null}

        <ThemeToggle />

        {!loading && !user ? (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-primary btn-sm md:btn-md">
              Login
            </Link>
          </div>
        ) : null}

        {!loading && user ? (
          <div className="dropdown dropdown-end">
            <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
              {user.photoURL ? (
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt={user.displayName || user.email || 'User avatar'} />
                </div>
              ) : (
                <div className="bg-primary text-primary-content flex h-10 w-10 items-center justify-center rounded-full">
                  <span className="text-sm font-semibold">{avatarLabel}</span>
                </div>
              )}
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box border-base-300 bg-base-100 z-50 mt-3 w-64 border p-2 shadow"
            >
              <li className="menu-title">
                <span>{user.displayName || 'Signed in user'}</span>
              </li>
              <li className="text-base-content/70 pointer-events-none px-4 py-2 text-sm">{user.email}</li>
              <li>
                <Link href="/dashboard" className="gap-3">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="gap-3">
                  <UserCircle className="size-4" />
                  Profile
                </Link>
              </li>
              <li>
                <button type="button" onClick={signOut} className="gap-3">
                  <LogOut className="size-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
