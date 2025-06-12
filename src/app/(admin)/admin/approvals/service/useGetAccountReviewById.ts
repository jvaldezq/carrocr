import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ADMIN_GET_ACCOUNT_REVIEW_BY_ID } from '@/lib/queryKeys';
import { AccountReview } from '@/types/Admin';

const getAccountReviewById = async (id: string): Promise<AccountReview> => {
  const res = await api?.get(`/admin/account/review/${id}`);
  return res?.data;
};

export const useGetAccountReviewById = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [ADMIN_GET_ACCOUNT_REVIEW_BY_ID, id],
    queryFn: () => getAccountReviewById(id),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
