'use client';

import {useState} from 'react';
import {KeyRound} from 'lucide-react';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '@/libs/firebaseConfig';
import {useAuth} from '@/context/AuthContext';
import {useToast, ToastType} from '@/context/ToastContext';

export function PasswordResetCard() {
  const {user} = useAuth();
  const {addToast} = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleReset = async () => {
    if (!user?.email) return;

    setIsPending(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      addToast('Password reset email sent. Please check your inbox.', ToastType.SUCCESS);
    } catch {
      addToast('Failed to send reset email. Please try again.', ToastType.ERROR);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="card border-base-300 bg-base-100 border shadow-sm">
      <div className="card-body flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="card-title flex items-center gap-2 text-lg">
            <KeyRound className="size-5" /> Password & Security
          </h2>
          <p className="text-base-content/70 mt-1 text-sm">
            Receive an email with a secure link to update your password.
          </p>
        </div>
        <button onClick={handleReset} disabled={isPending} className="btn btn-outline w-full shrink-0 sm:w-auto">
          {isPending ? <span className="loading loading-spinner loading-sm" /> : 'Send Reset Link'}
        </button>
      </div>
    </div>
  );
}
