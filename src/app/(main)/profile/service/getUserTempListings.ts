import { useQuery } from '@tanstack/react-query';
import { Car } from '@/types/Car';
import { api } from '@/lib/axios';

export const USER_TEMP_LISTINGS = 'get-user-temp-listings';

const getUserTempListing = async (body: number[]): Promise<Car[]> => {
  const res = await api?.post('/user/listings', body);
  return res?.data;
};

export const useGetUserTempListing = (body: number[]) => {
  return useQuery({
    queryKey: [USER_TEMP_LISTINGS, ...body],
    staleTime: 0,
    enabled: !!body,
    queryFn: () => getUserTempListing(body),
    retry: 2,
    refetchOnReconnect: false,
  });
};
