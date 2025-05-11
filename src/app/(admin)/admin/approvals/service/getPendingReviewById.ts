import { useQuery } from '@tanstack/react-query';
import { FormCarType } from '@/lib/definitions';
import { api } from '@/lib/axios';
import { GET_PENDING_BY_ID } from '@/lib/queryKeys';

export const getPendingReviewById = async (
  id: string,
): Promise<FormCarType> => {
  const res = await api?.get(`/admin/listing/drafts/${id}`);
  return res?.data;
};

export const useFetPendingReviewById = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_PENDING_BY_ID, id],
    queryFn: () => getPendingReviewById(id),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
