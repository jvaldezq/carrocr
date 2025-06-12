import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import type { ListingDetails } from '@/types/Catalog';

export const fetchCarById = async (
  id: string,
): Promise<ServerApiResponse<ListingDetails>> => {
  return (await serverApi<ServerApiResponse<ListingDetails>>({
    path: `/catalog/${id}`,
    cache: 'no-cache',
  })) as ServerApiResponse<ListingDetails>;
};
