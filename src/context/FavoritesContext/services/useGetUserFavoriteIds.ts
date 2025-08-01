import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ME } from '@/lib/queryKeys';

export const getUserFavoriteIds = async (): Promise<number[]> => {
  const res = await api?.get('/user/favs');
  return res?.data;
};

export const useGetUserFavoriteIds = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: [ME, 'favorite-ids'],
    enabled: isAuthenticated,
    queryFn: getUserFavoriteIds,
    staleTime: 1,
    retry: 2,
    refetchOnReconnect: false,
  });
};
