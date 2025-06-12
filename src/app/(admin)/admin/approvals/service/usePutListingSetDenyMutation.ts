import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import {
  ADMIN_GET_LISTINGS_REVIEW,
  ADMIN_PUT_LISTING_SET_DENY,
} from '@/lib/queryKeys';

interface BodyProps {
  id: string;
  reason?: string;
}

const putListingSetDeny = async (body: BodyProps): Promise<null> => {
  const res = await api?.put(`/admin/listing/setDeny/${body.id}`, {
    body: body.reason,
  });
  return res?.data;
};

export const usePutListingSetDenyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BodyProps) => putListingSetDeny(body),
    mutationKey: [ADMIN_PUT_LISTING_SET_DENY],
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [ADMIN_GET_LISTINGS_REVIEW] })
        .then(() => {});
    },
  });
};
