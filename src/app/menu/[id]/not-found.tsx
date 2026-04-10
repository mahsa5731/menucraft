import Link from 'next/link';
import {Store} from 'lucide-react';

export default function MenuNotFound() {
  return (
    <div className="bg-base-200 flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="bg-base-100 mb-6 rounded-full p-6 shadow-sm">
        <Store className="text-base-content/30 size-12" />
      </div>
      <h1 className="text-3xl font-bold">Menu Not Found</h1>
      <p className="text-base-content/70 mt-4 max-w-md">
        We couldn&apos;t find a menu at this address. The restaurant may have removed it or the link might be incorrect.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Return Home
      </Link>
    </div>
  );
}
