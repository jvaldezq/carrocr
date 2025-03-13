import { serverApi } from '@/lib/serverApi';
import { UserProfile } from '@/lib/definitions';

export const getUserListings = async (
  token: string,
  id: string,
): Promise<UserProfile> => {
  return (await serverApi({
    path: `/listing/mini/${id}`,
    token,
    cache: 'no-cache',
  })) as Promise<UserProfile>;
};
