import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ADMIN_GET_ACCOUNTS_REVIEW } from '@/lib/queryKeys';
import { PendingAccount } from '@/types/Admin';

export const getAccountsReview = async (): Promise<PendingAccount[]> => {
  const res = await api?.get('/admin/account/review');
  return res?.data;
};

export const useGetAccountsReview = () => {
  return useQuery({
    queryKey: [ADMIN_GET_ACCOUNTS_REVIEW],
    queryFn: getAccountsReview,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
