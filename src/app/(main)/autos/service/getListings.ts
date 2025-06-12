import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';
import { CatalogAll } from '@/types/Catalog';

export const getListings = async (
  filters: AutoFiltersType,
): Promise<ServerApiResponse<CatalogAll>> => {
  return (await serverApi<ServerApiResponse<CatalogAll>>({
    path: `/catalog`,
    cache: 'no-cache',
    params: filters,
  })) as ServerApiResponse<CatalogAll>;
};
