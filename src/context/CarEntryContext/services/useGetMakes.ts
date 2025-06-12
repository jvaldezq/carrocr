import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DataResultType } from '@/types/Data';
import { DATA_GET_MAKES } from '@/lib/queryKeys';

const getMakes = async (): Promise<DataResultType[]> => {
  const res = await api?.get('/data/make');
  return res?.data;
};

export const useGetMakes = () => {
  return useQuery({
    queryKey: [DATA_GET_MAKES],
    queryFn: () => getMakes(),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
  });
};
