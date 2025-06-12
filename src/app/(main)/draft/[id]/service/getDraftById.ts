import { serverApi, ServerApiResponse } from '@/lib/serverApi';
import { UserListing } from '@/types/User';

export const fetchDraftById = async (
  id: string,
): Promise<ServerApiResponse<UserListing>> => {
  return (await serverApi<ServerApiResponse<UserListing>>({
    path: `/user/listing/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<UserListing>;
};
