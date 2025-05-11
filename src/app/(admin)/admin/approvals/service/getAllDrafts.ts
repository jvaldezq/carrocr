import { useQuery } from '@tanstack/react-query';
import { FormCarType } from '@/lib/definitions';
import { api } from '@/lib/axios';
import { ALL_DRAFTS } from '@/lib/queryKeys';

export const getAllDrafts = async (): Promise<FormCarType[]> => {
  const res = await api?.get('/listing/allDrafts');
  return res?.data;
};

export const useGetAllDrafts = () => {
  return useQuery({
    queryKey: [ALL_DRAFTS],
    queryFn: getAllDrafts,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
