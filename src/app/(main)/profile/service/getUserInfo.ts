import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { UserInfo } from '@/lib/definitions';

export const getUserInfo = async (): Promise<ServerApiResponse<UserInfo>> => {
  return (await serverApi<ServerApiResponse<UserInfo>>({
    path: `/user/info`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<UserInfo>;
};
