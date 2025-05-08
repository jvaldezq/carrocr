import { useQuery } from '@tanstack/react-query';
import { ListResultType } from '@/lib/definitions';
import { api } from '@/lib/axios';

export const fetchMakes = async (): Promise<ListResultType[]> => {
  const res = await api?.get('/make');
  return res?.data;
};

export const useGetMakes = () => {
  return useQuery({
    queryKey: ['makes'],
    queryFn: () => fetchMakes(),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
  });
};
