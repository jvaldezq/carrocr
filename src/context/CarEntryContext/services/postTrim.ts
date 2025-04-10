import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { ListResultType } from '@/lib/definitions';

export const createTrim = async (
  body: {
    name: string;
    modelID: number;
  },
  protectedAxios?: axios.AxiosInstance,
): Promise<ListResultType[]> => {
  const res = await protectedAxios?.post('/trim', body);
  return res?.data;
};

export const useCreateTrimMutation = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (body: { name: string; modelID: number }) =>
      createTrim(body, protectedAxios),
    mutationKey: ['trim-create'],
  });
};
