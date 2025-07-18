import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SmallCard } from '@/types/Catalog';

export const getMyListings = async (): Promise<
  ServerApiResponse<SmallCard[]>
> => {
  return (await serverApi<ServerApiResponse<SmallCard[]>>({
    path: '/user/listings',
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<SmallCard[]>;
};
