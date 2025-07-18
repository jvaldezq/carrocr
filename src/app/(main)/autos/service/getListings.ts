import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { CatalogAll } from '@/types/Catalog';

export const getListings = async (
  filters: unknown, //TODO FIX THE TYPE
): Promise<ServerApiResponse<CatalogAll>> => {
  return (await serverApi<ServerApiResponse<CatalogAll>>({
    path: `/catalog`,
    cache: 'no-cache',
    // params: filters,
  })) as ServerApiResponse<CatalogAll>;
};
