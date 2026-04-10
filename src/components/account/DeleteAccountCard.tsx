'use client';

import {useRouter} from 'next/navigation';
import {AlertTriangle, Trash2} from 'lucide-react';
import {useAuth} from '@/context/AuthContext';
import {useModal} from '@/context/ModalContext';
import {useToast, ToastType} from '@/context/ToastContext';
import {useDeleteAccount} from '@/hooks/useAccount';

export function DeleteAccountCard() {
  const router = useRouter();
  const {signOut} = useAuth();
  const {showModal, hideModal} = useModal();
  const {addToast} = useToast();
  const deleteMutation = useDeleteAccount();

  const confirmDelete = () => {
    showModal({
      title: 'Delete Account Permanently?',
      body: 'This action cannot be undone. Your restaurant profile, menus, and all associated data will be permanently wiped from our servers.',
      type: 'error',
      actions: [
        {
          label: 'Cancel',
          className: 'btn-ghost',
          onClick: hideModal,
        },
        {
          label: 'Delete My Account',
          className: 'btn-error',
          onClick: async () => {
            try {
              await deleteMutation.mutateAsync();
              hideModal();
              await signOut();
              addToast('Account deleted successfully.', ToastType.SUCCESS);
              router.push('/');
            } catch {
              addToast('Failed to delete account.', ToastType.ERROR);
              hideModal();
            }
          },
        },
      ],
    });
  };

  return (
    <div className="card border-error/30 bg-error/5 border shadow-sm">
      <div className="card-body flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="card-title text-error flex items-center gap-2 text-lg">
            <AlertTriangle className="size-5" /> Danger Zone
          </h2>
          <p className="text-base-content/70 mt-1 text-sm">Permanently delete your account and all restaurant data.</p>
        </div>
        <button
          onClick={confirmDelete}
          disabled={deleteMutation.isPending}
          className="btn btn-error w-full shrink-0 sm:w-auto"
        >
          {deleteMutation.isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <Trash2 className="size-4" /> Delete Account
            </>
          )}
        </button>
      </div>
    </div>
  );
}
