import { useQuery } from '@tanstack/react-query';
import { ListResultType } from '@/lib/definitions';
import { api } from '@/lib/axios';

export const fetchModels = async (
  makeId?: number | string,
): Promise<ListResultType[]> => {
  const res = await api?.get('/model', {
    params: {
      makeid: makeId,
    },
  });
  return res?.data;
};

export const useGetModels = (makeId?: number | string) => {
  return useQuery({
    queryKey: ['models', makeId],
    enabled: !!makeId,
    queryFn: () => fetchModels(makeId),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
  });
};
