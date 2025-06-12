import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { SellerInfo } from '@/types/Seller';

export const getSellerInfo = async (
  id: string,
): Promise<ServerApiResponse<SellerInfo>> => {
  return (await serverApi<ServerApiResponse<SellerInfo>>({
    path: `/seller/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<SellerInfo>;
};
