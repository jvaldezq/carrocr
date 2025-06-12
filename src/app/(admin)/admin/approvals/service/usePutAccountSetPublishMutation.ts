import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import {
  ADMIN_GET_ACCOUNTS_REVIEW,
  ADMIN_PUT_ACCOUNT_SET_PUBLISH,
} from '@/lib/queryKeys';

const putAccountSetPublish = async (id: string): Promise<null> => {
  const res = await api?.put(`/admin/account/setPublish/${id}`);
  return res?.data;
};

export const usePutAccountSetPublishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => putAccountSetPublish(id),
    mutationKey: [ADMIN_PUT_ACCOUNT_SET_PUBLISH],
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [ADMIN_GET_ACCOUNTS_REVIEW] })
        .then(() => {});
    },
  });
};
