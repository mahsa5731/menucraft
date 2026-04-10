'use client';

import {Controller, useFormContext} from 'react-hook-form';
import {Trash2, DollarSign, Tag, AlignLeft, Pencil, GripVertical, Check} from 'lucide-react';
import {useModal} from '@/context/ModalContext';
import type {RestaurantProfile} from '@/types/schema';

interface DishEditorProps {
  sectionIndex: number;
  dishIndex: number;
  removeDish: (index: number) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function DishEditor({sectionIndex, dishIndex, removeDish, isOpen, onOpen, onClose}: DishEditorProps) {
  const {
    control,
    register,
    watch,
    formState: {errors},
  } = useFormContext<RestaurantProfile>();
  const {showModal, hideModal} = useModal();

  const dishErrors = errors.menuSections?.[sectionIndex]?.dishes?.[dishIndex];

  // Watch these specific fields to display them live in the compact row
  const currentName = watch(`menuSections.${sectionIndex}.dishes.${dishIndex}.name`);
  const currentPrice = watch(`menuSections.${sectionIndex}.dishes.${dishIndex}.price`);
  const currentDesc = watch(`menuSections.${sectionIndex}.dishes.${dishIndex}.description`);

  const confirmRemove = () => {
    showModal({
      title: 'Remove Dish?',
      body: 'Are you sure you want to remove this dish?',
      type: 'warning',
      actions: [
        {label: 'Cancel', className: 'btn-ghost', onClick: hideModal},
        {
          label: 'Remove',
          className: 'btn-error',
          onClick: () => {
            removeDish(dishIndex);
            hideModal();
          },
        },
      ],
    });
  };

  return (
    <>
      {/* 1. COMPACT LIST ROW UI */}
      <div className="border-base-300 bg-base-100 hover:border-primary/40 group flex flex-col justify-between rounded-xl border p-3 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 overflow-hidden">
          <GripVertical className="text-base-content/30 size-4 shrink-0 cursor-grab" />
          <div className="flex flex-col truncate">
            <span
              className={`truncate text-sm font-semibold sm:text-base ${!currentName ? 'text-base-content/50 italic' : 'text-base-content'}`}
            >
              {currentName || 'Unnamed Dish'}
            </span>
            {currentDesc && <span className="text-base-content/60 truncate text-xs">{currentDesc}</span>}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4 pl-7 sm:mt-0 sm:justify-end sm:pl-4">
          <div className="badge badge-ghost font-medium">${Number(currentPrice || 0).toFixed(2)}</div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onOpen}
              className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-primary"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              onClick={confirmRemove}
              className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-error"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE EDIT MODAL */}
      {isOpen && (
        <div className="modal modal-open modal-bottom sm:modal-middle z-50 backdrop-blur-sm">
          <div className="modal-box border-base-300 overflow-hidden rounded-t-2xl border p-0 shadow-2xl sm:rounded-2xl">
            <div className="bg-base-200/50 border-base-300 flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold">Dish Details</h3>
              <button type="button" onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="form-control w-full">
                  <div className="label pt-0 pb-1.5">
                    <span className="label-text font-semibold">Dish Name</span>
                  </div>
                  <input
                    {...register(`menuSections.${sectionIndex}.dishes.${dishIndex}.name`)}
                    type="text"
                    className={`input input-bordered w-full ${dishErrors?.name ? 'input-error' : ''}`}
                    placeholder="e.g. Classic Cheeseburger"
                    autoFocus
                  />
                </div>

                <div className="form-control w-full">
                  <div className="label pt-0 pb-1.5">
                    <span className="label-text font-semibold">Price</span>
                  </div>
                  <label
                    className={`input input-bordered flex items-center gap-2 ${dishErrors?.price ? 'input-error' : ''}`}
                  >
                    <DollarSign className="size-4 opacity-50" />
                    <input
                      {...register(`menuSections.${sectionIndex}.dishes.${dishIndex}.price`, {valueAsNumber: true})}
                      type="number"
                      step="0.01"
                      className="grow"
                      placeholder="0.00"
                    />
                  </label>
                </div>
              </div>

              <div className="form-control w-full">
                <div className="label pt-0 pb-1.5">
                  <span className="label-text flex items-center gap-2 font-semibold">
                    <AlignLeft className="size-4 opacity-70" /> Description
                  </span>
                </div>
                <textarea
                  {...register(`menuSections.${sectionIndex}.dishes.${dishIndex}.description`)}
                  className="textarea textarea-bordered min-h-[80px] text-sm leading-relaxed"
                  placeholder="A brief, appetizing description of the dish..."
                />
              </div>

              <div className="form-control w-full">
                <div className="label pt-0 pb-1.5">
                  <span className="label-text flex items-center gap-2 font-semibold">
                    <Tag className="size-4 opacity-70" /> Ingredients
                  </span>
                  <span className="label-text-alt opacity-60">Comma separated</span>
                </div>
                <Controller
                  name={`menuSections.${sectionIndex}.dishes.${dishIndex}.ingredients`}
                  control={control}
                  render={({field}) => (
                    <input
                      value={field.value?.join(', ') || ''}
                      onChange={(e) => {
                        const arr = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        field.onChange(arr);
                      }}
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="e.g. Beef patty, Cheddar, Lettuce, Tomato"
                    />
                  )}
                />
              </div>
            </div>

            <div className="bg-base-200/50 border-base-300 flex flex-col-reverse gap-3 border-t px-6 py-4 sm:flex-row sm:justify-end">
              <button type="button" onClick={onClose} className="btn btn-primary w-full sm:w-auto">
                <Check className="size-4" /> Done Editing
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-base-300/40" onClick={onClose}></div>
        </div>
      )}
    </>
  );
}
