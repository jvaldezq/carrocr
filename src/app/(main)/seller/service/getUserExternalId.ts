import { serverApi, ServerApiResponse } from '@/lib/serverApi';

export const getUserExternalId = async (
  id: string,
): Promise<ServerApiResponse<string>> => {
  return (await serverApi<ServerApiResponse<string>>({
    path: `/user/getExternalID/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<string>;
};
