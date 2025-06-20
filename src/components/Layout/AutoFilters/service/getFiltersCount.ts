import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';
import { CatalogAll } from '@/types/Catalog';

export const getFiltersCount = async (
  filters: AutoFiltersType,
): Promise<CatalogAll> => {
  const res = await api.get('/catalog', {
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
