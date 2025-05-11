import type { Car } from '@/types/Car';
import { serverApi } from '@/lib/serverApi';

export const fetchVerifiedCarsCars = async (): Promise<Car[]> => {
  return (await serverApi<Car[]>({
    path: '/listing/R5VA',
    cache: 'no-cache',
  })) as Car[];
};
