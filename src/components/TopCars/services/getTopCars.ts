import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SmallCard } from '@/types/Catalog';

export const fetchTopCars = async (): Promise<
  ServerApiResponse<SmallCard[]>
> => {
  return (await serverApi<ServerApiResponse<SmallCard[]>>({
    path: '/listing/mini',
    params: { premium: 'true' },
  })) as ServerApiResponse<SmallCard[]>;
};
