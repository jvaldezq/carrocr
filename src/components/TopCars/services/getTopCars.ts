import type { Car } from '@/types/Car';
import { serverApi } from '@/lib/serverApi';

export const fetchTopCars = async (): Promise<Car[]> => {
  return (await serverApi({
    path: '/listing/mini',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    params: { premium: 'true' },
  })) as Promise<Car[]>;
};
