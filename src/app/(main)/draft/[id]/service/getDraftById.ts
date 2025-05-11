import { FormCarType } from '@/lib/definitions';
import { serverApi } from '@/lib/serverApi';

export const fetchDraftById = async (id: string): Promise<FormCarType> => {
  return (await serverApi<FormCarType>({
    path: `/listing/drafts/${id}`,
    cache: 'no-cache',
    requiresAuth: true,
  })) as FormCarType;
};
