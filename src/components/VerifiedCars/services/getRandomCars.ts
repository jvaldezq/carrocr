import type { Car } from '@/types/Car';
import { serverApi, ServerApiResponse } from '@/lib/serverApi';

export const fetchVerifiedCarsCars = async (): Promise<
  ServerApiResponse<Car[]>
> => {
  return (await serverApi<ServerApiResponse<Car[]>>({
    path: '/listing/random/verified',
    cache: 'no-cache',
  })) as ServerApiResponse<Car[]>;
};
