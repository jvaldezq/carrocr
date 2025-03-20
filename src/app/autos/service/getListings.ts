import { serverApi } from '@/lib/serverApi';
import { ListingResponse } from '@/lib/definitions';

export const getListings = async (): Promise<ListingResponse> => {
  return (await serverApi({
    path: `/listing`,
    cache: 'no-cache',
  })) as Promise<ListingResponse>;
};
