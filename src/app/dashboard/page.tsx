'use client';

import {useAuth} from '@/context/AuthContext';
import {PublicMenuCard} from '@/components/dashboard/PublicMenuCard';
import {QuickActions} from '@/components/dashboard/QuickActions';

export default function DashboardPage() {
  const {user} = useAuth();

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4">
      <div className="border-base-300 bg-base-200 rounded-[2rem] border p-6 md:p-8">
        <div className="badge badge-primary badge-outline mb-4">Dashboard</div>

        <h1 className="text-3xl font-bold md:text-4xl">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ''}.
        </h1>

        <p className="text-base-content/70 mt-4 max-w-2xl text-base leading-7">
          Manage your restaurant&apos;s digital presence. Keep your menu up to date and share your unique QR code with
          customers.
        </p>
      </div>

      <PublicMenuCard />

      <div className="mt-4">
        <h2 className="mb-4 text-xl font-bold">Quick Actions</h2>
        <QuickActions />
      </div>
    </section>
  );
}
