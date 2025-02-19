import type { Car } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/clientApi';

const fetchDraftById = async (id: number | null): Promise<Car> => {
  const cars = await clientApi.get(`/listing/drafts/${id}`);
  return cars.data;
};

export const useGetDraftById = (id: number | null) =>
  useQuery({
    queryKey: ['car'],
    staleTime: 0,
    enabled: !!id,
    queryFn: () => fetchDraftById(id),
    retry: 2,
    refetchOnReconnect: false,
  });
