import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/clientApi';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

export const DEFAULT_FILTERS = 'get-default-filters';

const getDefaultFilters = async (): Promise<AutoFiltersType> => {
  const res = await clientApi?.get('/filter/default');
  return res?.data;
};

export const useGetDefaultFilters = () => {
  return useQuery({
    queryKey: [DEFAULT_FILTERS],
    staleTime: 0,
    enabled: true,
    queryFn: getDefaultFilters,
    retry: 2,
    refetchOnReconnect: false,
  });
};
