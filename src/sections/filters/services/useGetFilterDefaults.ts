import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DATA_FILTER_DEFAULTS } from '@/lib/queryKeys';

export type FilterBounds = {
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
};

export const getFilterDefaults = async (): Promise<FilterBounds> => {
  const res = await api?.get('/data/filter/defaults');
  return res?.data as FilterBounds;
};

export const useGetFilterDefaults = () => {
  return useQuery({
    queryKey: [DATA_FILTER_DEFAULTS],
    queryFn: getFilterDefaults,
    staleTime: 1000 * 60 * 60 * 24, // cache for a day
    retry: 2,
    refetchOnReconnect: false,
  });
};

