import type { Car } from '@/types/Car';
import { serverApi } from '@/lib/serverApi';

export const fetchRandomCars = async (): Promise<Car[]> => {
  return (await serverApi<Car[]>({
    path: '/listing/R5VA',
    cache: 'no-cache',
  })) as Car[];
};
