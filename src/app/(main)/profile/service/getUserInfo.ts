import { serverApi } from '@/lib/serverApi';
import { UserInfo } from '@/lib/definitions';

export const getUserInfo = async (token: string): Promise<UserInfo> => {
  return (await serverApi({
    path: `/user/info`,
    token,
    cache: 'no-cache',
  })) as Promise<UserInfo>;
};
