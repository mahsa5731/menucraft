'use client';

import Link from 'next/link';
import {LayoutDashboard, LogOut, BookOpen, Settings, Store, UserCircle} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/restaurant',
    label: 'Restaurant Profile',
    icon: Store,
  },
  {
    href: '/dashboard/menus',
    label: 'My Menus',
    icon: BookOpen,
  },
  {
    href: '/dashboard/account',
    label: 'Account',
    icon: UserCircle,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const {user, loading, signOut} = useAuth();
  const pathname = usePathname();

  if (loading || !user) {
    return null;
  }

  return (
    <div className="drawer-side z-40">
      <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay" />
      <aside className="border-base-300 bg-base-200 text-base-content flex min-h-full w-72 flex-col border-r">
        <div className="border-base-300 border-b px-6 py-5">
          <Link href="/" className="text-base-content text-2xl font-bold tracking-tight">
            Menucraft
          </Link>
          <p className="text-base-content/70 mt-1 text-sm">Manage your restaurant menus in one place.</p>
        </div>

        <div className="px-4 py-4">
          <div className="rounded-box bg-base-100 flex items-center gap-3 p-3 shadow-sm">
            <div className="bg-primary text-primary-content flex h-12 w-12 items-center justify-center rounded-full">
              <span className="text-sm font-semibold">
                {(user.displayName?.trim()?.charAt(0) || user.email?.trim()?.charAt(0) || 'U').toUpperCase()}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-base-content truncate font-medium">{user.displayName || 'Restaurant Owner'}</p>
              <p className="text-base-content/70 truncate text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        <ul className="menu text-base-content gap-1 px-3 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive ? 'active bg-primary text-primary-content' : 'hover:bg-base-300'}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-base-300 mt-auto border-t p-4">
          <button type="button" onClick={signOut} className="btn btn-outline btn-error w-full justify-start">
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
