import { useQuery } from '@tanstack/react-query';
import { ME } from '@/lib/queryKeys';
import { api } from '@/lib/axios';
import { Me } from '@/types/Me';

const getMe = async (): Promise<Me> => {
  const response = await api.get(`/user/me`);
  return response.data;
};

export const useGetMe = () =>
  useQuery({
    queryKey: [ME],
    staleTime: 0,
    queryFn: getMe,
    retry: 2,
    refetchOnReconnect: false,
  });
