import {z} from 'zod';

export const DishSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Dish name is required'),
  description: z.string().optional(),
  price: z.number().nonnegative('Price cannot be negative').optional(),
  ingredients: z.array(z.string()).optional(),
});

export const MenuSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Section title is required'),
  dishes: z.array(DishSchema),
});

export const RestaurantProfileSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required'),
  phone: z.string().min(5, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address is required'),
  coverImage: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  menuSections: z.array(MenuSectionSchema),
});

export type Dish = z.infer<typeof DishSchema>;
export type MenuSection = z.infer<typeof MenuSectionSchema>;
export type RestaurantProfile = z.infer<typeof RestaurantProfileSchema>;
