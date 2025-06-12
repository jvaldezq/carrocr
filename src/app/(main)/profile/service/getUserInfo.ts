import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { UserData } from '@/types/User';

export const getUser = async (): Promise<ServerApiResponse<UserData>> => {
  return (await serverApi<ServerApiResponse<UserData>>({
    path: `/user`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<UserData>;
};
