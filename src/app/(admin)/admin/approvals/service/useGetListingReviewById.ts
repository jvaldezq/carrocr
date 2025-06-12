import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ADMIN_GET_LISTING_REVIEW_BY_ID } from '@/lib/queryKeys';
import { ListingReview } from '@/types/Admin';

export const getListingReviewById = async (
  id: string,
): Promise<ListingReview> => {
  const res = await api?.get(`/admin/listing/review/${id}`);
  return res?.data;
};

export const useGetListingReviewById = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [ADMIN_GET_LISTING_REVIEW_BY_ID, id],
    queryFn: () => getListingReviewById(id),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
