'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import {Copy, ExternalLink, Check, QrCode} from 'lucide-react';
import {useToast, ToastType} from '@/context/ToastContext';
import {useAuth} from '@/context/AuthContext';

export function PublicMenuCard() {
  const {user} = useAuth();
  const {addToast} = useToast();
  const [copied, setCopied] = useState(false);

  const menuUrl = user?.uid ? `${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${user.uid}` : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      addToast('Menu link copied to clipboard!', ToastType.SUCCESS);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('Failed to copy link.', ToastType.ERROR);
    }
  };

  if (!menuUrl) return null;

  return (
    <div className="card border-base-300 bg-base-100 border shadow-sm">
      <div className="card-body">
        <div className="mb-2 flex items-center gap-2">
          <QrCode className="text-primary size-5" />
          <h2 className="card-title">Your Live Menu</h2>
        </div>
        <p className="text-base-content/70 mb-4 text-sm">
          Share this link with your customers or print the QR code for your tables.
        </p>

        <div className="bg-base-200/50 border-base-300 flex flex-col items-center gap-8 rounded-2xl border p-6 md:flex-row md:items-start">
          <div className="shrink-0 rounded-xl bg-white p-3 shadow-sm">
            <QRCode value={menuUrl} size={120} level="H" className="h-auto max-w-full" />
          </div>

          <div className="flex w-full flex-col justify-center gap-4">
            <div className="w-full">
              <span className="text-base-content/50 mb-1.5 block text-xs font-bold tracking-wider uppercase">
                Public Link
              </span>
              <div className="flex w-full items-center gap-2">
                <input
                  type="text"
                  value={menuUrl}
                  readOnly
                  className="input input-bordered input-sm bg-base-100 grow font-mono text-sm"
                />
                <button
                  onClick={handleCopy}
                  className={`btn btn-square btn-sm ${copied ? 'btn-success text-white' : 'btn-outline'}`}
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <Link href={`/menu/${user?.uid}`} target="_blank" className="btn btn-primary btn-sm">
                <ExternalLink className="size-4" />
                View Live Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
