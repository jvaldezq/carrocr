import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';
import { ListingResponse } from '@/lib/definitions';

export const getFiltersCount = async (
  filters: AutoFiltersType,
): Promise<ListingResponse> => {
  const res = await api.get('/listing', {
    params: { ...filters, returnCountOnlyTF: true },
  });
  return res?.data;
};

export const useGetFiltersCount = () => {
  return useMutation({
    mutationFn: (filters: AutoFiltersType) => getFiltersCount(filters),
    mutationKey: ['get-filters-count'],
  });
};
