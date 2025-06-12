import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';
import { FilterDefaults } from '@/types/Data';

export const getFiltersCount = async (
  filters: AutoFiltersType,
): Promise<FilterDefaults> => {
  const res = await api.get('/data/filter/default', {
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
