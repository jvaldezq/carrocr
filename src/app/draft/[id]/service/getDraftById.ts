import { FormCarType } from '@/lib/definitions';
import { serverApi } from '@/lib/serverApi';

export const fetchDraftByIdV1 = async (
  id: string,
  token: string,
): Promise<FormCarType> => {
  return (await serverApi({
    path: `/listing/drafts/${id}`,
    token,
  })) as Promise<FormCarType>;
};
