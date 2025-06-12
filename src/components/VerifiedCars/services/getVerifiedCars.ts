import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SmallCard } from '@/types/Catalog';

export const fetchVerifiedCarsCars = async (): Promise<
  ServerApiResponse<SmallCard[]>
> => {
  return (await serverApi<ServerApiResponse<SmallCard[]>>({
    path: '/catalog/random/verified',
    cache: 'no-cache',
  })) as ServerApiResponse<SmallCard[]>;
};
