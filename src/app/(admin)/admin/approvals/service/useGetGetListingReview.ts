import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ADMIN_GET_LISTINGS_REVIEW } from '@/lib/queryKeys';
import { PendingListing } from '@/types/Admin';

export const getGetListingReview = async (): Promise<PendingListing[]> => {
  const res = await api?.get('/admin/listing/review');
  return res?.data;
};

export const useGetGetListingReview = () => {
  return useQuery({
    queryKey: [ADMIN_GET_LISTINGS_REVIEW],
    queryFn: getGetListingReview,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
