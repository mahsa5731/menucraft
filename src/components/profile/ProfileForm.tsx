'use client';

import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {MapPin, Phone, Store} from 'lucide-react';
import {useAuth} from '@/context/AuthContext';
import {useToast, ToastType} from '@/context/ToastContext';
import {useRestaurantProfile, useSaveProfile} from '@/hooks/useRestaurantProfile';
import {RestaurantProfileSchema, type RestaurantProfile} from '@/types/schema';
import {ProfileImageUpload} from './ProfileImageUpload';
import {ProfilePreview} from './ProfilePreview';

export function ProfileForm() {
  const {user} = useAuth();
  const {addToast} = useToast();

  const {data: initialData, isLoading} = useRestaurantProfile(user?.uid);
  const saveMutation = useSaveProfile(user?.uid);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm<RestaurantProfile>({
    resolver: zodResolver(RestaurantProfileSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      coverImage: '',
      menuSections: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        coverImage: initialData.coverImage || '',
        menuSections: initialData.menuSections || [],
      });
    }
  }, [initialData, reset]);

  const formValues = watch();

  const onSubmit = async (data: RestaurantProfile) => {
    try {
      await saveMutation.mutateAsync(data);
      addToast('Profile saved successfully', ToastType.SUCCESS);
    } catch {
      addToast('Failed to save profile', ToastType.ERROR);
    }
  };

  const onInvalid = () => {
    addToast('Please fix the errors in the form before saving.', ToastType.WARNING);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="card border-base-300 bg-base-100 border shadow-sm">
        <div className="card-body p-6">
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-5">
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Restaurant Name</span>
              </div>
              <label className={`input input-bordered flex items-center gap-3 ${errors.name ? 'input-error' : ''}`}>
                <Store className="size-4 opacity-50" />
                <input {...register('name')} type="text" className="grow" placeholder="e.g. Menucraft Bistro" />
              </label>
              {errors.name && (
                <div className="label pb-0">
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                </div>
              )}
            </div>

            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Phone Number</span>
              </div>
              <label className={`input input-bordered flex items-center gap-3 ${errors.phone ? 'input-error' : ''}`}>
                <Phone className="size-4 opacity-50" />
                <input {...register('phone')} type="text" className="grow" placeholder="e.g. +1 (204) 555-0199" />
              </label>
              {errors.phone && (
                <div className="label pb-0">
                  <span className="label-text-alt text-error">{errors.phone.message}</span>
                </div>
              )}
            </div>

            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Address</span>
              </div>
              <div className="relative">
                <MapPin className="absolute top-3.5 left-4 size-4 opacity-50" />
                <textarea
                  {...register('address')}
                  placeholder="e.g. 123 Main Street, Winnipeg, MB"
                  className={`textarea textarea-bordered min-h-[120px] w-full pt-3 pl-11 leading-relaxed ${errors.address ? 'textarea-error' : ''}`}
                />
              </div>
              {errors.address && (
                <div className="label pb-0">
                  <span className="label-text-alt text-error">{errors.address.message}</span>
                </div>
              )}
            </div>

            <ProfileImageUpload
              value={formValues.coverImage || ''}
              onChange={(url) => setValue('coverImage', url, {shouldDirty: true})}
            />

            <div className="pt-4">
              <button type="submit" className="btn btn-primary w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <span className="loading loading-spinner loading-sm" /> : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <ProfilePreview data={formValues} />
      </div>
    </div>
  );
}
