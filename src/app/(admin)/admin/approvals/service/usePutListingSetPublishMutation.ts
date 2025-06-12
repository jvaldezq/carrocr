import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import {
  ADMIN_GET_LISTINGS_REVIEW,
  ADMIN_PUT_LISTING_SET_PUBLISH,
} from '@/lib/queryKeys';

const putListingSetPublish = async (id: string): Promise<null> => {
  const res = await api?.put(`/admin/listing/setPublish/${id}`);
  return res?.data;
};

export const usePutListingSetPublishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => putListingSetPublish(id),
    mutationKey: [ADMIN_PUT_LISTING_SET_PUBLISH],
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [ADMIN_GET_LISTINGS_REVIEW] })
        .then(() => {});
    },
  });
};
