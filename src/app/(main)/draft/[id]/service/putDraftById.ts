import type { FormCarType } from '@/lib/definitions';
import { useMutation } from '@tanstack/react-query';
import type { Car } from '@/types/Car';
import { api } from '@/lib/axios';

export const UPDATE_DRAFT_BY_ID = 'updateDraftById';

const updateDraftById = async (body: FormCarType): Promise<Car> => {
  const res = await api?.put(`/listing/drafts/${body.id}`, body);
  return res?.data;
};

export const useUpdateDraftByIdMutation = () => {
  return useMutation({
    mutationFn: (body: FormCarType) => updateDraftById(body),
    mutationKey: [UPDATE_DRAFT_BY_ID],
  });
};
