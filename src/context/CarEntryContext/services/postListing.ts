import { useMutation } from '@tanstack/react-query';
import { clientApi } from '@/lib/clientApi';
import { CarFormProps } from '@/context/CarEntryContext/CreateCar';

export const createListing = async (data: CarFormProps): Promise<number> => {
  const res = await clientApi.post('/listing', data);
  return res.data;
};

export const useCreateMutation = () => {
  return useMutation({
    mutationFn: (data: CarFormProps) => createListing(data),
    mutationKey: ['listing-create'],
  });
};
