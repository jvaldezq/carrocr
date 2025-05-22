import type { Car } from '@/types/Car';
import { serverApi, ServerApiResponse } from '@/lib/serverApi';

export const fetchCarById = async (
  id: string,
): Promise<ServerApiResponse<Car>> => {
  return (await serverApi<ServerApiResponse<Car>>({
    path: `/listing/${id}`,
    cache: 'no-cache',
  })) as ServerApiResponse<Car>;
};
