'use client';

import Link from 'next/link';
import {LayoutDashboard, LogOut, BookOpen, Settings, Store, UserCircle, Users} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {Permission, hasPermission} from '@/types/roles';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    permission: Permission.VIEW_DASHBOARD,
  },
  {
    href: '/dashboard/restaurant',
    label: 'Restaurant Profile',
    icon: Store,
    permission: Permission.MANAGE_RESTAURANT,
  },
  {
    href: '/dashboard/menus',
    label: 'My Menus',
    icon: BookOpen,
    permission: Permission.MANAGE_MENUS,
  },
  {
    href: '/dashboard/account',
    label: 'Account',
    icon: UserCircle,
    permission: Permission.MANAGE_ACCOUNT,
  },
  {
    href: '/admin/users',
    label: 'All Users',
    icon: Users,
    permission: Permission.VIEW_ALL_USERS,
  },
];

export default function Sidebar() {
  const {user, claims, loading, signOut} = useAuth();
  const pathname = usePathname();

  if (loading || !user) {
    return null;
  }

  const filteredMenuItems = menuItems.filter((item) => hasPermission(claims?.role, item.permission));

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

        <ul className="menu text-base-content w-full gap-1 px-3 py-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="w-full">
                <Link
                  href={item.href}
                  className={isActive ? 'active bg-primary text-primary-content w-full' : 'hover:bg-base-300 w-full'}
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
