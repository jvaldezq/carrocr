import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ADD_TO_FAV, ME } from '@/lib/queryKeys';

export const addToFavorites = async (id: number) => {
  const res = await api?.post(`/user/fav/${id}`);
  return res?.data;
};

export const useAddToFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addToFavorites(id),
    mutationKey: [ADD_TO_FAV],
    // Optimistic update favorites list for snappy UI
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [ME, 'favorite-ids'] });

      const previous = queryClient.getQueryData<number[]>([ME, 'favorite-ids']);

      const next = (() => {
        const current = previous ?? [];
        return current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id];
      })();

      queryClient.setQueryData([ME, 'favorite-ids'], next);

      return { previous } as { previous?: number[] };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData([ME, 'favorite-ids'], context.previous);
      }
    },
    onSettled: () => {
      // Revalidate to ensure server is source of truth
      queryClient.invalidateQueries({ queryKey: [ME] }).then(() => {});
      queryClient
        .invalidateQueries({ queryKey: [ME, 'favorite-ids'] })
        .then(() => {});
    },
  });
};
