import type { UserProfile } from '@/lib/definitions';
import { useMutation } from '@tanstack/react-query';
import type { Car } from '@/types/Car';
import { api } from '@/lib/axios';

export const UPDATE_PROFILE_INFO = 'update-profile-info';

const updateProfileInfo = async (body: UserProfile): Promise<Car> => {
  const res = await api?.put('user/info', body);
  return res?.data;
};

export const useUpdateProfileInfoMutation = () => {
  return useMutation({
    mutationFn: (body: UserProfile) => updateProfileInfo(body),
    mutationKey: [UPDATE_PROFILE_INFO],
  });
};
