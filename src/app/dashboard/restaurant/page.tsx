'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {ImageIcon, MapPin, Phone, Save, Store, Upload, X} from 'lucide-react';
import {useAuth} from '@/context/AuthContext';
import {
  deleteRestaurantCoverImageByUrl,
  getRestaurantProfile,
  saveRestaurantProfile,
  uploadRestaurantCoverImage,
} from '@/libs/restaurantProfile';
import type {RestaurantProfile} from '@/types/restaurantProfile';

const initialForm: RestaurantProfile = {
  name: '',
  phone: '',
  address: '',
  coverImage: '',
  updatedAt: null,
};

export default function RestaurantProfilePage() {
  const {user, loading: authLoading} = useAuth();

  const [form, setForm] = useState<RestaurantProfile>(initialForm);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isComplete = useMemo(() => {
    return Boolean(form.name.trim() && form.phone.trim() && form.address.trim() && form.coverImage.trim());
  }, [form]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user?.uid) {
      setPageLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        setPageLoading(true);
        setError(null);

        const profile = await getRestaurantProfile(user.uid);

        if (profile) {
          setForm(profile);
        } else {
          setForm(initialForm);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load restaurant profile.');
      } finally {
        setPageLoading(false);
      }
    };

    loadProfile();
  }, [authLoading, user?.uid]);

  const handleChange =
    (key: keyof RestaurantProfile) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));

      if (error) {
        setError(null);
      }

      if (success) {
        setSuccess(null);
      }
    };

  const handleReset = async () => {
    if (!user?.uid) {
      setForm(initialForm);
      return;
    }

    try {
      setPageLoading(true);
      setError(null);
      setSuccess(null);

      const profile = await getRestaurantProfile(user.uid);

      if (profile) {
        setForm(profile);
      } else {
        setForm(initialForm);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset form.');
    } finally {
      setPageLoading(false);
    }
  };

  const handleSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!user?.uid) {
      setError('You must be logged in to upload a cover image.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      event.target.value = '';
      return;
    }

    try {
      setUploadingImage(true);
      setError(null);
      setSuccess(null);

      const imageUrl = await uploadRestaurantCoverImage(user.uid, file);

      setForm((prev) => ({
        ...prev,
        coverImage: imageUrl,
      }));

      setSuccess('Cover image uploaded successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload cover image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!form.coverImage) {
      return;
    }

    try {
      setUploadingImage(true);
      setError(null);
      setSuccess(null);

      await deleteRestaurantCoverImageByUrl(form.coverImage);

      setForm((prev) => ({
        ...prev,
        coverImage: '',
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setSuccess('Cover image removed successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove cover image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?.uid) {
      setError('You must be logged in to save your restaurant profile.');
      return;
    }

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Please complete restaurant name, phone number, and address.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await saveRestaurantProfile(user.uid, form);

      setSuccess('Restaurant profile saved successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save restaurant profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="border-base-300 bg-base-200 rounded-[2rem] border p-6 md:p-8">
        <div className="badge badge-primary badge-outline mb-4">Restaurant Profile</div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold md:text-4xl">Set up your restaurant details</h1>
            <p className="text-base-content/70 mt-3 text-base leading-7">
              Add your restaurant name, phone number, address, and cover image. This information can be reused across
              your menus.
            </p>
          </div>

          <div className="rounded-box bg-base-100 px-4 py-3 shadow-sm">
            <p className="text-base-content/60 text-sm">Profile status</p>
            <div className={`badge mt-1 ${isComplete ? 'badge-success badge-outline' : 'badge-warning badge-outline'}`}>
              {isComplete ? 'Complete' : 'Incomplete'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card border-base-300 bg-base-100 border shadow-sm">
          <div className="card-body">
            <div className="mb-2">
              <h2 className="card-title">Restaurant Information</h2>
              <p className="text-base-content/70 text-sm">
                These details will appear as the core identity of your digital menu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Restaurant Name</span>
                  </div>
                  <div className="relative">
                    <Store className="text-base-content/50 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Menucraft Bistro"
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Phone Number</span>
                  </div>
                  <div className="relative">
                    <Phone className="text-base-content/50 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <input
                      type="text"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+1 (204) 000-0000"
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Address</span>
                </div>
                <div className="relative">
                  <MapPin className="text-base-content/50 pointer-events-none absolute top-4 left-3 size-4" />
                  <textarea
                    value={form.address}
                    onChange={handleChange('address')}
                    placeholder="123 Main Street, Winnipeg, Manitoba"
                    className="textarea textarea-bordered min-h-28 w-full pl-10"
                  />
                </div>
              </label>

              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Cover Image</span>
                </div>

                <div className="rounded-box border-base-300 bg-base-200 border border-dashed p-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSelectImage}
                  />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base-content font-medium">Upload a restaurant cover image</p>
                      <p className="text-base-content/70 mt-1 text-sm">
                        Use JPG, PNG, or WEBP to make your menu look more professional.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                      >
                        {uploadingImage ? (
                          <span className="loading loading-spinner loading-sm" />
                        ) : (
                          <>
                            <Upload className="size-4" />
                            Upload Image
                          </>
                        )}
                      </button>

                      {form.coverImage ? (
                        <button
                          type="button"
                          className="btn btn-ghost text-error"
                          onClick={handleRemoveImage}
                          disabled={uploadingImage}
                        >
                          <X className="size-4" />
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              ) : null}

              {success ? (
                <div className="alert alert-success">
                  <span>{success}</span>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button type="submit" className="btn btn-primary" disabled={submitting || uploadingImage}>
                  {submitting ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <Save className="size-4" />
                      Save Profile
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleReset}
                  disabled={submitting || uploadingImage}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card border-base-300 bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Preview</h2>
              <p className="text-base-content/70 text-sm">
                A simple preview of how your restaurant details can appear.
              </p>

              <div className="border-base-300 bg-base-200 mt-3 overflow-hidden rounded-[1.5rem] border">
                <div className="bg-base-300 flex h-44 items-center justify-center">
                  {form.coverImage.trim() ? (
                    <img
                      src={form.coverImage}
                      alt={form.name || 'Restaurant cover'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-base-content/50 flex flex-col items-center gap-2">
                      <ImageIcon className="size-8" />
                      <span className="text-sm">Cover image preview</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-5">
                  <div>
                    <p className="text-2xl font-bold">{form.name.trim() || 'Your Restaurant Name'}</p>
                  </div>

                  <div className="text-base-content/70 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 size-4 shrink-0" />
                      <span>{form.phone.trim() || 'Your phone number will appear here'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0" />
                      <span>{form.address.trim() || 'Your address will appear here'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-base-300 bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Why this matters</h2>
              <ul className="text-base-content/70 list-disc space-y-2 pl-5 text-sm leading-6">
                <li>Your restaurant details can be reused across all menus.</li>
                <li>You only need to enter the core information once.</li>
                <li>A complete profile makes your menu look more professional.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
