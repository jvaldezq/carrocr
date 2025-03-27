import { serverApi } from '@/lib/serverApi';
import { ListingResponse } from '@/lib/definitions';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

export const getListings = async (
  filters: AutoFiltersType,
): Promise<ListingResponse> => {
  return (await serverApi({
    path: `/listing`,
    cache: 'no-cache',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    params: filters,
  })) as Promise<ListingResponse>;
};
