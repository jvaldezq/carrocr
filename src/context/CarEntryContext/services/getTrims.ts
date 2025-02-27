import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

interface ResultType {
  label: string;
  value: string | number;
}

export const fetchTrims = async (
  modelId?: number | string,
  protectedAxios?: axios.AxiosInstance,
): Promise<ResultType[]> => {
  const res = await protectedAxios?.get('/trim', {
    params: {
      modelID: modelId,
    },
  });
  return res?.data;
};

export const useGetTrims = (modelId?: number | string) => {
  const { protectedAxios } = useUser();

  return useQuery({
    queryKey: ['trims', modelId],
    enabled: !!modelId,
    queryFn: () => fetchTrims(modelId, protectedAxios),
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
