import { serverApi } from '@/lib/serverApi';
import { UserInfo } from '@/lib/definitions';

export const getUserInfo = async (): Promise<UserInfo> => {
  return (await serverApi<UserInfo>({
    path: `/user/info`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as UserInfo;
};
