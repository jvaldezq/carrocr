import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SmallCard } from '@/types/Catalog';

export const getUserListings = async (
  id: string,
): Promise<ServerApiResponse<SmallCard[]>> => {
  return (await serverApi<ServerApiResponse<SmallCard[]>>({
    path: `/listing/mini/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<SmallCard[]>;
};
