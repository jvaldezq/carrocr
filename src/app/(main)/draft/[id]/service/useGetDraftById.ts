import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { UserListing } from '@/types/User';

const getDraftById = async (id: string): Promise<UserListing> => {
  const res = await api?.get(`/user/listing/${id}`);
  return res?.data;
};

export const useGetDraftById = (id: string) => {
  return useQuery({
    queryKey: ['draft', id],
    queryFn: () => getDraftById(id),
    enabled: !!id,
    staleTime: 1, // 5 minutes
    retry: 2,
  });
};
