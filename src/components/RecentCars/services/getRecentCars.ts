import type { Car } from '@/types/Car';
import { serverApi } from '@/lib/serverApi';

export const fetchRecentCars = async (): Promise<Car[]> => {
  return (await serverApi<Car[]>({
    path: '/listing/Recent',
    cache: 'no-cache',
  })) as Car[];
};
