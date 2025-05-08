import { useMutation } from '@tanstack/react-query';
import { ListResultType } from '@/lib/definitions';
import { api } from '@/lib/axios';

export const createMake = async (name: string): Promise<ListResultType[]> => {
  const res = await api?.post('/make', { name });
  return res?.data;
};

export const useCreateMakeMutation = () => {
  return useMutation({
    mutationFn: (name: string) => createMake(name),
    mutationKey: ['make-create'],
  });
};
