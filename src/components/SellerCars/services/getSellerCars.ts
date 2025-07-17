import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SmallCard } from '@/types/Catalog';

export const fetchSellerCars = async (id: string): Promise<
  ServerApiResponse<SmallCard[]>
> => {
  return (await serverApi<ServerApiResponse<SmallCard[]>>({
    path: `/catalog/user/${id}`,
    cache: 'no-cache',
  })) as ServerApiResponse<SmallCard[]>;
};
