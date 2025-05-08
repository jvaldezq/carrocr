import { serverApi } from '@/lib/serverApi';
import { type Car } from '@/types/Car';

export const getUserListings = async (id: string): Promise<Car[]> => {
  return (await serverApi<Car[]>({
    path: `/listing/mini/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as Car[];
};
