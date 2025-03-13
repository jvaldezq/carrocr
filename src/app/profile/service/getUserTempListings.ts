import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { Car } from '@/lib/definitions';

export const USER_TEMP_LISTINGS = 'get-user-temp-listings';

const getUserTempListing = async (
  body: number[],
  protectedAxios?: axios.AxiosInstance,
): Promise<Car[]> => {
  const res = await protectedAxios?.post('/user/listings', body);
  return res?.data;
};

export const useGetUserTempListing = (body: number[]) => {
  const { protectedAxios } = useUser();

  return useQuery({
    queryKey: [USER_TEMP_LISTINGS, ...body],
    staleTime: 0,
    enabled: !!body,
    queryFn: () => getUserTempListing(body, protectedAxios),
    retry: 2,
    refetchOnReconnect: false,
  });
};
