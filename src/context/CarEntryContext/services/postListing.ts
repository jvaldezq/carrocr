import { useMutation } from '@tanstack/react-query';
import { CarFormProps } from '@/context/CarEntryContext/components/CreateCar';
import { api } from '@/lib/axios';

export const createListing = async (data: CarFormProps): Promise<number> => {
  const res = await api?.post('/listing', data);
  return res?.data;
};

export const useCreateMutation = () => {
  return useMutation({
    mutationFn: (data: CarFormProps) => createListing(data),
    mutationKey: ['listing-create'],
  });
};
