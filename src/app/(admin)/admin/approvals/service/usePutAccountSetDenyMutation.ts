import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import {
  ADMIN_GET_ACCOUNTS_REVIEW,
  ADMIN_PUT_ACCOUNT_SET_DENY,
} from '@/lib/queryKeys';

interface BodyProps {
  id: string;
  reason?: string;
}

const putAccountSetDeny = async (body: BodyProps): Promise<null> => {
  const res = await api?.put(`/admin/account/setDeny/${body.id}`, {
    body: body.reason,
  });
  return res?.data;
};

export const usePutAccountSetDenyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BodyProps) => putAccountSetDeny(body),
    mutationKey: [ADMIN_PUT_ACCOUNT_SET_DENY],
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [ADMIN_GET_ACCOUNTS_REVIEW] })
        .then(() => {});
    },
  });
};
