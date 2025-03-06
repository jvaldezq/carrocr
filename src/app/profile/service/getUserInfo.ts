import { serverApi } from '@/lib/serverApi';
import { UserProfile } from '@/lib/definitions';

export const getUserInfo = async (token: string): Promise<UserProfile> => {
  return (await serverApi({
    path: `/user/info`,
    token,
    cache: 'no-cache',
  })) as Promise<UserProfile>;
};
