import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DataResultType } from '@/types/Data';
import { DATA_POST_MODEL } from '@/lib/queryKeys';

export const postModel = async (body: {
  name: string;
  makeId: number;
}): Promise<DataResultType[]> => {
  const res = await api?.post('/data/model', body);
  return res?.data;
};

export const usePostModelMutation = () => {
  return useMutation({
    mutationFn: (body: { name: string; makeId: number }) => postModel(body),
    mutationKey: [DATA_POST_MODEL],
  });
};
