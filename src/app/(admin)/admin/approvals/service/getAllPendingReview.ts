import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ALL_PENDING } from '@/lib/queryKeys';
import { Draft } from '@/types/Drafts';

export const getAllPendingReview = async (): Promise<Draft[]> => {
  const res = await api?.get('/admin/listing/allReviews');
  return res?.data;
};

export const useGetAllPendingReview = () => {
  return useQuery({
    queryKey: [ALL_PENDING],
    queryFn: getAllPendingReview,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
