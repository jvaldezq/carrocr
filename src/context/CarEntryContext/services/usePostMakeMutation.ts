import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DataResultType } from '@/types/Data';
import { DATA_POST_MAKE } from '@/lib/queryKeys';

const postMake = async (name: string): Promise<DataResultType[]> => {
  const res = await api?.post('/data/make', { name });
  return res?.data;
};

export const usePostMakeMutation = () => {
  return useMutation({
    mutationFn: (name: string) => postMake(name),
    mutationKey: [DATA_POST_MAKE],
  });
};
