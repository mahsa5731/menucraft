'use client';

import {useRef} from 'react';
import {Upload, X} from 'lucide-react';
import {useAuth} from '@/context/AuthContext';
import {useToast, ToastType} from '@/context/ToastContext';
import {useModal} from '@/context/ModalContext';
import {useUploadCoverImage, useRemoveCoverImage} from '@/hooks/useRestaurantProfile';

interface ProfileImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ProfileImageUpload({value, onChange}: ProfileImageUploadProps) {
  const {user} = useAuth();
  const {addToast} = useToast();
  const {showModal, hideModal} = useModal();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadMutation = useUploadCoverImage(user?.uid);
  const removeMutation = useRemoveCoverImage();

  const handleSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file.', ToastType.ERROR);
      event.target.value = '';
      return;
    }

    try {
      const url = await uploadMutation.mutateAsync(file);
      onChange(url);
      addToast('Cover image uploaded successfully.', ToastType.SUCCESS);
    } catch {
      addToast('Failed to upload cover image.', ToastType.ERROR);
    }
  };

  const confirmRemoveImage = () => {
    showModal({
      title: 'Remove Cover Image?',
      body: 'Are you sure you want to delete this image? This action cannot be undone.',
      type: 'warning',
      actions: [
        {
          label: 'Cancel',
          className: 'btn-ghost',
          onClick: hideModal,
        },
        {
          label: 'Remove',
          className: 'btn-error',
          onClick: async () => {
            try {
              await removeMutation.mutateAsync(value);
              onChange('');
              if (fileInputRef.current) fileInputRef.current.value = '';
              addToast('Cover image removed.', ToastType.SUCCESS);
            } catch {
              addToast('Failed to remove image.', ToastType.ERROR);
            }
            hideModal();
          },
        },
      ],
    });
  };

  const isPending = uploadMutation.isPending || removeMutation.isPending;

  return (
    <div className="form-control w-full">
      <div className="label">
        <span className="label-text font-medium">Cover Image</span>
      </div>

      <div className="rounded-box border-base-300 bg-base-200 flex items-center justify-between border p-4">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleSelectImage} />

        <div className="flex gap-3">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
          >
            {uploadMutation.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <Upload className="size-4" />
                Upload
              </>
            )}
          </button>

          {value && (
            <button
              type="button"
              className="btn btn-ghost btn-sm text-error"
              onClick={confirmRemoveImage}
              disabled={isPending}
            >
              <X className="size-4" />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
