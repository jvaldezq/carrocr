import { serverApi } from '@/lib/serverApi';
import { UserProfile } from '@/lib/definitions';

export const getUserInfo = async (id: string): Promise<UserProfile> => {
  return (await serverApi<UserProfile>({
    path: `/user/${id}/info`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as UserProfile;
};
