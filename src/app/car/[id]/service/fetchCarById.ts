import type { Car } from '@/lib/definitions';
import { serverApi } from '@/lib/serverApi';

export const fetchCarById = async (id: string): Promise<Car> => {
  return (await serverApi({
    path: `/listing/${id}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    params: {
      approvedTF: true,
    },
  })) as Promise<Car>;
};
