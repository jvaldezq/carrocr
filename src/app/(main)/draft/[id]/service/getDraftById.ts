import { FormCarType } from '@/lib/definitions';
import { serverApi, ServerApiResponse } from '@/lib/serverApi';

export const fetchDraftById = async (
  id: string,
): Promise<ServerApiResponse<FormCarType>> => {
  return (await serverApi<ServerApiResponse<FormCarType>>({
    path: `/listing/drafts/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as ServerApiResponse<FormCarType>;
};
