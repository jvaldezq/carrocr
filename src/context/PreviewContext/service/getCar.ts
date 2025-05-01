import type { Car } from '@/types/Car';
import { useQuery } from '@tanstack/react-query';
import { CAR_DIALOG } from '@/lib/queryKeys';
import { api } from '@/lib/axios';

const fetchCarById = async (id: number | null): Promise<Car> => {
  const cars = await api.get(`/listing/preview/${id}`);
  return cars.data;
};

export const useGetCar = (id: number | null) =>
  useQuery({
    queryKey: [CAR_DIALOG],
    staleTime: 0,
    enabled: !!id,
    queryFn: () => fetchCarById(id),
    retry: 2,
    refetchOnReconnect: false,
  });
