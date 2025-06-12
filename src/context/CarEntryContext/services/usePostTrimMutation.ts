import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DataResultType } from '@/types/Data';
import { DATA_POST_TRIM } from '@/lib/queryKeys';

export const postTrim = async (body: {
  name: string;
  modelID: number;
}): Promise<DataResultType[]> => {
  const res = await api?.post('/data/trim', body);
  return res?.data;
};

export const usePostTrimMutation = () => {
  return useMutation({
    mutationFn: (body: { name: string; modelID: number }) => postTrim(body),
    mutationKey: [DATA_POST_TRIM],
  });
};
