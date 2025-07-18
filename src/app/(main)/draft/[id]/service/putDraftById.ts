import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { UserListing } from '@/types/User';

export const UPDATE_DRAFT_BY_ID = 'updateDraftById';

const updateDraftById = async (body: UserListing): Promise<UserListing> => {
  const res = await api?.put(`/user/listing/${body.id}`, body);
  return res?.data;
};

export const useUpdateDraftByIdMutation = () => {
  return useMutation({
    mutationFn: (body: UserListing) => updateDraftById(body),
    mutationKey: [UPDATE_DRAFT_BY_ID],
  });
};
