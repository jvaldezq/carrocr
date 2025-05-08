import { useMutation } from '@tanstack/react-query';
import { ListResultType } from '@/lib/definitions';
import { api } from '@/lib/axios';

export const createTrim = async (body: {
  name: string;
  modelID: number;
}): Promise<ListResultType[]> => {
  const res = await api?.post('/trim', body);
  return res?.data;
};

export const useCreateTrimMutation = () => {
  return useMutation({
    mutationFn: (body: { name: string; modelID: number }) => createTrim(body),
    mutationKey: ['trim-create'],
  });
};
