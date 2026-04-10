import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@/libs/api-client';

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async () => {
      return await apiClient.delete('/api/account');
    },
  });
}
