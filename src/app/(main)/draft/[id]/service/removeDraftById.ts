import type { Car } from '@/types/Car';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

export const REMOVE_DRAFT_BY_ID = 'removeDraftById';

const removeDraftById = async (
  id: number,
  protectedAxios?: axios.AxiosInstance,
): Promise<Car> => {
  const res = await protectedAxios?.delete(`/listing/${id}`);
  return res?.data;
};

export const useRemoveDraftByIdMutation = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (id: number) => removeDraftById(id, protectedAxios),
    mutationKey: [REMOVE_DRAFT_BY_ID],
  });
};
