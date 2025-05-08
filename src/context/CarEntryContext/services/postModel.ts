import { useMutation } from '@tanstack/react-query';
import { ListResultType } from '@/lib/definitions';
import { api } from '@/lib/axios';

export const createModel = async (body: {
  name: string;
  makeId: number;
}): Promise<ListResultType[]> => {
  const res = await api?.post('/model', body);
  return res?.data;
};

export const useCreateModelMutation = () => {
  return useMutation({
    mutationFn: (body: { name: string; makeId: number }) => createModel(body),
    mutationKey: ['model-create'],
  });
};
