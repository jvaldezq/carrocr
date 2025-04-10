import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { ListResultType } from '@/lib/definitions';

export const createMake = async (
  name: string,
  protectedAxios?: axios.AxiosInstance,
): Promise<ListResultType[]> => {
  const res = await protectedAxios?.post('/make', { name });
  return res?.data;
};

export const useCreateMakeMutation = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (name: string) => createMake(name, protectedAxios),
    mutationKey: ['make-create'],
  });
};
