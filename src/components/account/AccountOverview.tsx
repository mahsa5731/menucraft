'use client';

import {Mail, User, Shield} from 'lucide-react';
import {useAuth} from '@/context/AuthContext';

export function AccountOverview() {
  const {user, claims} = useAuth();

  return (
    <div className="card border-base-300 bg-base-100 border shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Account Details</h2>

        <div className="space-y-4">
          <div className="form-control w-full">
            <div className="label pt-0 pb-1.5">
              <span className="label-text font-semibold">Email Address</span>
            </div>
            <label className="input input-bordered bg-base-200 flex items-center gap-3">
              <Mail className="size-4 opacity-50" />
              <input type="text" className="text-base-content/70 grow" value={user?.email || ''} readOnly disabled />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="form-control w-full">
              <div className="label pt-0 pb-1.5">
                <span className="label-text font-semibold">Account ID</span>
              </div>
              <label className="input input-bordered bg-base-200 flex items-center gap-3">
                <User className="size-4 opacity-50" />
                <input
                  type="text"
                  className="text-base-content/70 grow font-mono text-sm"
                  value={user?.uid || ''}
                  readOnly
                  disabled
                />
              </label>
            </div>

            <div className="form-control w-full">
              <div className="label pt-0 pb-1.5">
                <span className="label-text font-semibold">Role</span>
              </div>
              <label className="input input-bordered bg-base-200 flex items-center gap-3">
                <Shield className="size-4 opacity-50" />
                <input
                  type="text"
                  className="text-base-content/70 grow capitalize"
                  value={claims?.role || 'Owner'}
                  readOnly
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
