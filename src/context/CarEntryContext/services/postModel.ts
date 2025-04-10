import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { ListResultType } from '@/lib/definitions';

export const createModel = async (
  body: {
    name: string;
    makeId: number;
  },
  protectedAxios?: axios.AxiosInstance,
): Promise<ListResultType[]> => {
  const res = await protectedAxios?.post('/model', body);
  return res?.data;
};

export const useCreateModelMutation = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (body: { name: string; makeId: number }) =>
      createModel(body, protectedAxios),
    mutationKey: ['model-create'],
  });
};
