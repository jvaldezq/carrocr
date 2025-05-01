import { useMutation } from '@tanstack/react-query';
import { CarFormProps } from '@/context/CarEntryContext/components/CreateCar';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

export const createListing = async (
  data: CarFormProps,
  protectedAxios?: axios.AxiosInstance,
): Promise<number> => {
  const res = await protectedAxios?.post('/listing', data);
  return res?.data;
};

export const useCreateMutation = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (data: CarFormProps) => createListing(data, protectedAxios),
    mutationKey: ['listing-create'],
  });
};
