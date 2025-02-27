import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

interface ResultType {
  label: string;
  value: string | number;
}

export const fetchModels = async (
  makeId?: number | string,
  protectedAxios?: axios.AxiosInstance,
): Promise<ResultType[]> => {
  const res = await protectedAxios?.get('/model', {
    params: {
      makeid: makeId,
    },
  });
  return res?.data;
};

export const useGetModels = (makeId?: number | string) => {
  const { protectedAxios } = useUser();
  return useQuery({
    queryKey: ['models', makeId],
    enabled: !!makeId,
    queryFn: () => fetchModels(makeId, protectedAxios),
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
