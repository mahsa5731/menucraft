import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@/libs/api-client';
import {uploadRestaurantCoverImage, deleteRestaurantCoverImageByUrl} from '@/libs/restaurantProfile';
import type {RestaurantProfile} from '@/types/schema';

export function useRestaurantProfile(uid: string | undefined) {
  return useQuery({
    queryKey: ['restaurantProfile', uid],
    queryFn: async () => {
      const data = await apiClient.get<RestaurantProfile | null>('/api/profile');
      return (
        data || {
          name: '',
          phone: '',
          address: '',
          coverImage: '',
          menuSections: [],
        }
      );
    },
    enabled: !!uid,
  });
}

export function useSaveProfile(uid: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RestaurantProfile) => {
      await apiClient.post<RestaurantProfile>('/api/profile', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['restaurantProfile', uid]});
    },
  });
}

export function useUploadCoverImage(uid: string | undefined) {
  return useMutation({
    mutationFn: async (file: File) => {
      if (!uid) throw new Error('Unauthorized');
      return await uploadRestaurantCoverImage(uid, file);
    },
  });
}

export function useRemoveCoverImage() {
  return useMutation({
    mutationFn: async (url: string) => {
      await deleteRestaurantCoverImageByUrl(url);
    },
  });
}
