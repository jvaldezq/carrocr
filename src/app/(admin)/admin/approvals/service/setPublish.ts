import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ALL_PENDING, SET_PUBLISH } from '@/lib/queryKeys';

export const setPublish = async (id: string): Promise<null> => {
  const res = await api?.put(`/listing/setPublish/${id}`);
  return res?.data;
};

export const useSetPublishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => setPublish(id),
    mutationKey: [SET_PUBLISH],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALL_PENDING] }).then(() => {});
    },
  });
};
