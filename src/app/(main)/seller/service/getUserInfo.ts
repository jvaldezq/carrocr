import { serverApi } from '@/lib/serverApi';
import { UserProfile } from '@/lib/definitions';

export const getUserInfo = async (
  token: string,
  id: string,
): Promise<UserProfile> => {
  return (await serverApi({
    path: `/user/${id}/info`,
    token,
    cache: 'no-cache',
  })) as Promise<UserProfile>;
};
