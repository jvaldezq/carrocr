import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DataResultType } from '@/types/Data';
import { DATA_GET_MODELS } from '@/lib/queryKeys';

const getModels = async (
  makeId?: number | string,
): Promise<DataResultType[]> => {
  const res = await api?.get('/data/model', {
    params: {
      makeId,
    },
  });
  return res?.data;
};

export const useGetModels = (makeId?: number | string) => {
  return useQuery({
    queryKey: [DATA_GET_MODELS, makeId],
    enabled: !!makeId,
    queryFn: () => getModels(makeId),
    staleTime: 1,
    retry: 2,
    refetchOnReconnect: false,
  });
};
