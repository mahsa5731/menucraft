'use client';

import Link from 'next/link';
import {Store, UtensilsCrossed} from 'lucide-react';

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card border-base-300 bg-base-100 hover:border-primary/30 border shadow-sm transition-colors">
        <div className="card-body">
          <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-xl">
            <UtensilsCrossed className="text-primary size-6" />
          </div>
          <h3 className="text-lg font-bold">Menu Builder</h3>
          <p className="text-base-content/70 mb-4 text-sm">
            Add new dishes, organize categories, and update your prices.
          </p>
          <Link href="/dashboard/menus" className="btn btn-outline btn-sm mt-auto w-fit">
            Edit Menu
          </Link>
        </div>
      </div>

      <div className="card border-base-300 bg-base-100 hover:border-primary/30 border shadow-sm transition-colors">
        <div className="card-body">
          <div className="bg-secondary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-xl">
            <Store className="text-secondary size-6" />
          </div>
          <h3 className="text-lg font-bold">Restaurant Profile</h3>
          <p className="text-base-content/70 mb-4 text-sm">
            Update your cover image, contact information, and address.
          </p>
          <Link href="/dashboard/restaurant" className="btn btn-outline btn-sm mt-auto w-fit">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
