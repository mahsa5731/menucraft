'use client';

import {useState} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Trash2, Plus, GripVertical} from 'lucide-react';
import {useModal} from '@/context/ModalContext';
import {DishEditor} from './DishEditor';
import type {RestaurantProfile} from '@/types/schema';

interface SectionEditorProps {
  sectionIndex: number;
  removeSection: (index: number) => void;
}

export function SectionEditor({sectionIndex, removeSection}: SectionEditorProps) {
  const {
    control,
    register,
    formState: {errors},
  } = useFormContext<RestaurantProfile>();
  const {showModal, hideModal} = useModal();

  // Track which dish is currently being edited in the modal
  const [openDishIndex, setOpenDishIndex] = useState<number | null>(null);

  const {
    fields: dishes,
    append: appendDish,
    remove: removeDish,
  } = useFieldArray({
    control,
    name: `menuSections.${sectionIndex}.dishes`,
  });

  const sectionErrors = errors.menuSections?.[sectionIndex];

  const confirmRemoveSection = () => {
    showModal({
      title: 'Delete Category?',
      body: 'This will remove the category and all dishes inside it. This cannot be undone.',
      type: 'error',
      actions: [
        {label: 'Cancel', className: 'btn-ghost', onClick: hideModal},
        {
          label: 'Delete Category',
          className: 'btn-error',
          onClick: () => {
            removeSection(sectionIndex);
            hideModal();
          },
        },
      ],
    });
  };

  const handleAddDish = () => {
    appendDish({id: crypto.randomUUID(), name: '', price: 0, ingredients: []});
    // Automatically open the modal for the newly added dish
    setOpenDishIndex(dishes.length);
  };

  return (
    <div className="border-base-300 bg-base-200/30 rounded-[1.5rem] border p-5 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-full items-center gap-3 sm:max-w-xs">
          <GripVertical className="text-base-content/30 size-5 cursor-grab" />
          <select
            {...register(`menuSections.${sectionIndex}.title`)}
            className={`select select-bordered w-full font-semibold ${sectionErrors?.title ? 'select-error' : ''}`}
          >
            <option value="" disabled>
              Select Category...
            </option>
            <option value="Starters">Starters</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Main Course">Main Course</option>
            <option value="Chef's Specials">Chef&apos;s Specials</option>
            <option value="Sides">Sides</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
            <option value="Kids Menu">Kids Menu</option>
          </select>
        </div>

        <div className="flex items-center gap-2 pl-8 sm:pl-0">
          <button type="button" onClick={handleAddDish} className="btn btn-sm btn-primary btn-outline">
            <Plus className="size-4" /> Add Dish
          </button>
          <button
            type="button"
            onClick={confirmRemoveSection}
            className="btn btn-sm btn-square btn-ghost text-base-content/50 hover:bg-error/10 hover:text-error"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pl-8 sm:pl-10">
        {dishes.length === 0 ? (
          <div className="border-base-300 text-base-content/50 rounded-xl border-2 border-dashed py-6 text-center text-sm">
            No dishes in this category yet. Click &quot;Add Dish&quot; to get started.
          </div>
        ) : (
          dishes.map((dish, dishIndex) => (
            <DishEditor
              key={dish.id}
              sectionIndex={sectionIndex}
              dishIndex={dishIndex}
              removeDish={removeDish}
              isOpen={openDishIndex === dishIndex}
              onOpen={() => setOpenDishIndex(dishIndex)}
              onClose={() => setOpenDishIndex(null)}
            />
          ))
        )}
      </div>
    </div>
  );
}
