import { useQuery } from '@tanstack/react-query';
import { ListResultType } from '@/lib/definitions';
import { api } from '@/lib/axios';

export const fetchTrims = async (
  modelId?: number | string,
): Promise<ListResultType[]> => {
  const res = await api?.get('/trim', {
    params: {
      modelID: modelId,
    },
  });
  return res?.data;
};

export const useGetTrims = (modelId?: number | string) => {
  return useQuery({
    queryKey: ['trims', modelId],
    enabled: !!modelId,
    queryFn: () => fetchTrims(modelId),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
