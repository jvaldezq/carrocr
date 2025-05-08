import type { Car } from '@/types/Car';
import { serverApi } from '@/lib/serverApi';

export const fetchCarById = async (id: string): Promise<Car> => {
  return (await serverApi<Car>({
    path: `/listing/${id}`,
    cache: 'no-cache',
  })) as Car;
};
