import { serverApi } from '@/lib/serverApi';
import { type Car } from '@/types/Car';

export const getUserListings = async (
  token: string,
  id: string,
): Promise<Car[]> => {
  return (await serverApi({
    path: `/listing/mini/${id}`,
    token,
    cache: 'no-cache',
  })) as Promise<Car[]>;
};
