import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

interface ResultType {
  label: string;
  value: string | number;
}

export const fetchMakes = async (
  protectedAxios?: axios.AxiosInstance,
): Promise<ResultType[]> => {
  const res = await protectedAxios?.get('/make');
  return res?.data;
};

export const useGetMakes = () => {
  const { protectedAxios } = useUser();

  return useQuery({
    queryKey: ['makes'],
    queryFn: () => fetchMakes(protectedAxios),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    select: (data: ResultType[]) => {
      return [
        {
          label: 'Marcas',
          options: data,
        },
      ];
    },
  });
};
