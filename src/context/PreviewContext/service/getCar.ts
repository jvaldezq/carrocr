import { useQuery } from '@tanstack/react-query';
import { CATALOG_PREVIEW_BY_ID } from '@/lib/queryKeys';
import { api } from '@/lib/axios';
import type { Preview } from '@/types/Catalog';

const fetchCarById = async (id: number | null): Promise<Preview> => {
  const cars = await api.get(`/catalog/preview/${id}`);
  return cars.data;
};

export const useGetCar = (id: number | null) =>
  useQuery({
    queryKey: [CATALOG_PREVIEW_BY_ID],
    staleTime: 0,
    enabled: !!id,
    queryFn: () => fetchCarById(id),
    retry: 2,
    refetchOnReconnect: false,
  });
