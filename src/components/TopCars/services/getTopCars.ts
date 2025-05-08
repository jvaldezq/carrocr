import type { Car } from '@/types/Car';
import { serverApi } from '@/lib/serverApi';

export const fetchTopCars = async (): Promise<Car[]> => {
  return (await serverApi<Car[]>({
    path: '/listing/mini',
    params: { premium: 'true' },
  })) as Car[];
};
