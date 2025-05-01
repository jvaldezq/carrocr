import type { Car } from '@/types/Car';
import { serverApi } from '@/lib/serverApi';

export const fetchRandomCars = async (): Promise<Car[]> => {
  return (await serverApi({
    path: '/listing/R5VA',
  })) as Promise<Car[]>;
};
