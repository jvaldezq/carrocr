import type { FormCarType } from '@/lib/definitions';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import type { Car } from '@/types/Car';

export const UPDATE_DRAFT_BY_ID = 'updateDraftById';

const updateDraftById = async (
  body: FormCarType,
  protectedAxios?: axios.AxiosInstance,
): Promise<Car> => {
  const res = await protectedAxios?.put(`/listing/drafts/${body.id}`, body);
  return res?.data;
};

export const useUpdateDraftByIdMutation = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (body: FormCarType) => updateDraftById(body, protectedAxios),
    mutationKey: [UPDATE_DRAFT_BY_ID],
  });
};
