import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { type Car } from '@/types/Car';

export const getUserListings = async (
  id: string,
): Promise<ServerApiResponse<Car[]>> => {
  return (await serverApi<ServerApiResponse<Car[]>>({
    path: `/listing/mini/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<Car[]>;
};
