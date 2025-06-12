import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { UserInfo } from '@/types/User';
import { USER_PUT_PROFILE } from '@/lib/queryKeys';

const putUser = async (body: UserInfo) => {
  const res = await api?.put('user', body);
  return res?.data;
};

export const usePutUser = () => {
  return useMutation({
    mutationFn: (body: UserInfo) => putUser(body),
    mutationKey: [USER_PUT_PROFILE],
  });
};
