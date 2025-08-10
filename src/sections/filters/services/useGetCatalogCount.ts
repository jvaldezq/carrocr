import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export type CatalogParams = Record<string, unknown>;

type CatalogResponse = {
  listings: unknown[];
  pages: {
    listings: number;
    page: number;
    offset: number;
  };
};

export const useGetCatalogCount = (params: CatalogParams) => {
  const [debounced, setDebounced] = useState(params);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(params), 400);
    return () => clearTimeout(t);
  }, [params]);

  const key = useMemo(() => ['catalog-count', debounced], [debounced]);

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get<CatalogResponse>('/catalog', {
        params: { ...debounced, returnCountOnlyTF: true },
      });
      return res?.data?.pages?.listings ?? 0;
    },
    // Always enabled; backend returns count when returnCountOnlyTF=true
    staleTime: 5_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
