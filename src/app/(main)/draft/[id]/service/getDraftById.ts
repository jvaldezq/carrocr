import { FormCarType } from '@/lib/definitions';
import { serverApi } from '@/lib/serverApi';

export const fetchDraftById = async (
  id: string,
  token: string,
): Promise<FormCarType> => {
  return (await serverApi({
    path: `/listing/drafts/${id}`,
    token,
    cache: 'no-cache',
  })) as Promise<FormCarType>;
};
