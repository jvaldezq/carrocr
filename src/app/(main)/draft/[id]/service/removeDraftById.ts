import { UserListing } from '@/types/User';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const REMOVE_DRAFT_BY_ID = 'removeDraftById';

const removeDraftById = async (id: number): Promise<UserListing> => {
  const res = await api?.delete(`/listing/${id}`);
  return res?.data;
};

export const useRemoveDraftByIdMutation = () => {
  return useMutation({
    mutationFn: (id: number) => removeDraftById(id),
    mutationKey: [REMOVE_DRAFT_BY_ID],
  });
};
