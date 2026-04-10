'use client';

import {useEffect} from 'react';
import {useForm, FormProvider, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Plus, Save} from 'lucide-react';
import {useAuth} from '@/context/AuthContext';
import {useToast, ToastType} from '@/context/ToastContext';
import {useRestaurantProfile, useSaveProfile} from '@/hooks/useRestaurantProfile';
import {RestaurantProfileSchema, type RestaurantProfile} from '@/types/schema';
import {SectionEditor} from './SectionEditor';

export function MenuBuilderForm() {
  const {user} = useAuth();
  const {addToast} = useToast();

  const {data: initialData, isLoading} = useRestaurantProfile(user?.uid);
  const saveMutation = useSaveProfile(user?.uid);

  const methods = useForm<RestaurantProfile>({
    resolver: zodResolver(RestaurantProfileSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      coverImage: '',
      menuSections: [],
    },
  });

  const {control, handleSubmit, reset} = methods;

  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: 'menuSections',
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

  const onSubmit = async (data: RestaurantProfile) => {
    try {
      await saveMutation.mutateAsync(data);
      addToast('Menu updated successfully!', ToastType.SUCCESS);
    } catch {
      addToast('Failed to save menu changes.', ToastType.ERROR);
    }
  };

  const onInvalid = () => {
    addToast('Please fill in all required fields (Dish names, Category titles).', ToastType.WARNING);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-6">
        <div className="bg-base-100 border-base-200 sticky top-14 z-10 flex items-center justify-between border-b py-4">
          <div>
            <h2 className="text-2xl font-bold">Menu Builder</h2>
            <p className="text-sm opacity-70">Organize your offerings into categories.</p>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? (
              <span className="loading loading-spinner" />
            ) : (
              <>
                <Save className="size-4" /> Save Menu
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {sections.map((section, index) => (
            <SectionEditor key={section.id} sectionIndex={index} removeSection={removeSection} />
          ))}

          <button
            type="button"
            onClick={() => appendSection({id: crypto.randomUUID(), title: '', dishes: []})}
            className="btn btn-outline btn-lg border-dashed"
          >
            <Plus className="size-5" /> Add New Menu Category
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
