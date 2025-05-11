import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ALL_PENDING, SET_DENY } from '@/lib/queryKeys';

export const setDeny = async (id: string): Promise<null> => {
  const res = await api?.post(`/listing/setDeny/${id}`);
  return res?.data;
};

export const useSetDenyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => setDeny(id),
    mutationKey: [SET_DENY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALL_PENDING] }).then(() => {});
    },
  });
};
