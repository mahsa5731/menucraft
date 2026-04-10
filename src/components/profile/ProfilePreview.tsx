'use client';

import {ImageIcon, MapPin, Phone} from 'lucide-react';
import type {RestaurantProfile} from '@/types/schema';

interface ProfilePreviewProps {
  data: Partial<RestaurantProfile>;
}

export function ProfilePreview({data}: ProfilePreviewProps) {
  return (
    <div className="card border-base-300 bg-base-100 border shadow-sm">
      <div className="border-base-300 overflow-hidden rounded-t-2xl border-b">
        <div className="bg-base-300 flex h-48 items-center justify-center">
          {data.coverImage ? (
            <img src={data.coverImage} alt="Cover" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="text-base-content/30 size-10" />
          )}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <p className="text-2xl font-bold">{data.name || 'Restaurant Name'}</p>

        <div className="text-base-content/70 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Phone className="size-4 shrink-0" />
            <span>{data.phone || 'Phone number'}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="size-4 shrink-0" />
            <span>{data.address || 'Location address'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
