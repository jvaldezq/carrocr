import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { UserProfile } from '@/lib/definitions';

export const getSellerInfo = async (
  id: string,
): Promise<ServerApiResponse<UserProfile>> => {
  return (await serverApi<ServerApiResponse<UserProfile>>({
    path: `/user/info/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<UserProfile>;
};
