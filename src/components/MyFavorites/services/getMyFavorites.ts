import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SmallCard } from '@/types/Catalog';

export const fetchMyFavorites = async (): Promise<
  ServerApiResponse<SmallCard[]>
> => {
  return (await serverApi<ServerApiResponse<SmallCard[]>>({
    path: '/user/catalog/fav',
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<SmallCard[]>;
};
