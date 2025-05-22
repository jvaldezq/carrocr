import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { ListingResponse } from '@/lib/definitions';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

export const getListings = async (
  filters: AutoFiltersType,
): Promise<ServerApiResponse<ListingResponse>> => {
  return (await serverApi<ServerApiResponse<ListingResponse>>({
    path: `/listing`,
    cache: 'no-cache',
    params: filters,
  })) as ServerApiResponse<ListingResponse>;
};
