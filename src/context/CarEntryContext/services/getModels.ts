import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/clientApi';

interface ResultType {
  label: string;
  value: string | number;
}

export const fetchModels = async (
  makeId?: number | string,
): Promise<ResultType[]> => {
  const res = await clientApi.get('/model', {
    params: {
      makeid: makeId,
    },
  });
  return res.data;
};

export const useGetModels = (makeId?: number | string) => {
  return useQuery({
    queryKey: ['models', makeId],
    enabled: !!makeId,
    queryFn: () => fetchModels(makeId),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
    select: (data: ResultType[]) => {
      return [
        {
          label: 'Modelos',
          options: data,
        },
      ];
    },
  });
};
