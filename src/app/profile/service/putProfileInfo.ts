import type { Car, UserProfile } from '@/lib/definitions';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

export const UPDATE_PROFILE_INFO = 'update-profile-info';

const updateProfileInfo = async (
  body: UserProfile,
  protectedAxios?: axios.AxiosInstance,
): Promise<Car> => {
  const res = await protectedAxios?.put('user/info', body);
  return res?.data;
};

export const useUpdateProfileInfoMutation = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (body: UserProfile) => updateProfileInfo(body, protectedAxios),
    mutationKey: [UPDATE_PROFILE_INFO],
  });
};
