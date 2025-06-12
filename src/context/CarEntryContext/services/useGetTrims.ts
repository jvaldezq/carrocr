import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DataResultType } from '@/types/Data';
import { DATA_GET_TRIMS } from '@/lib/queryKeys';

export const getTrims = async (
  modelId?: number | string,
): Promise<DataResultType[]> => {
  const res = await api?.get('/data/trim', {
    params: {
      modelID: modelId,
    },
  });
  return res?.data;
};

export const useGetTrims = (modelId?: number | string) => {
  return useQuery({
    queryKey: [DATA_GET_TRIMS, modelId],
    enabled: !!modelId,
    queryFn: () => getTrims(modelId),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
