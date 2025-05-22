import type { Car } from '@/types/Car';
import { serverApi, ServerApiResponse } from '@/lib/serverApi';

export const fetchRecentCars = async (): Promise<ServerApiResponse<Car[]>> => {
  return (await serverApi<ServerApiResponse<Car[]>>({
    path: '/listing/random/recent',
    cache: 'no-cache',
  })) as ServerApiResponse<Car[]>;
};
