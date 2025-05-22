import type { Car } from '@/types/Car';
import { serverApi, ServerApiResponse } from '@/lib/serverApi';

export const fetchTopCars = async (): Promise<ServerApiResponse<Car[]>> => {
  return (await serverApi<ServerApiResponse<Car[]>>({
    path: '/listing/mini',
    params: { premium: 'true' },
  })) as ServerApiResponse<Car[]>;
};
