import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SmallCard } from '@/types/Catalog';

export const fetchRecentCars = async (): Promise<
  ServerApiResponse<SmallCard[]>
> => {
  return (await serverApi<ServerApiResponse<SmallCard[]>>({
    path: '/catalog/random/recent',
    cache: 'no-cache',
  })) as ServerApiResponse<SmallCard[]>;
};
