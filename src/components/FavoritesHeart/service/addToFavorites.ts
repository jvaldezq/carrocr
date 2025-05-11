import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ListResultType } from '@/lib/definitions';
import { api } from '@/lib/axios';
import { ADD_TO_FAV, ME } from '@/lib/queryKeys';

export const addToFavorites = async (id: number): Promise<ListResultType[]> => {
  const res = await api?.post(`/listing/fav/${id}`);
  return res?.data;
};

export const useAddToFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addToFavorites(id),
    mutationKey: [ADD_TO_FAV],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ME] }).then(() => {});
    },
  });
};
