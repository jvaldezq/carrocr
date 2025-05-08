import { serverApi } from '@/lib/serverApi';
import { ListingResponse } from '@/lib/definitions';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

export const getListings = async (
  filters: AutoFiltersType,
): Promise<ListingResponse> => {
  return (await serverApi<ListingResponse>({
    path: `/listing`,
    cache: 'no-cache',
    params: filters,
  })) as ListingResponse;
};
