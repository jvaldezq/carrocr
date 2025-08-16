import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const DELETE_IMAGE = 'deleteImage';

export interface DeleteImageProps {
  listingId: number;
  imgFileName: string; // server filename, not full URL
}

const deleteImage = async ({ listingId, imgFileName }: DeleteImageProps) => {
  await api?.({
    method: 'delete',
    url: `docs/listings/image/${listingId}/${encodeURIComponent(imgFileName)}`,
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: DeleteImageProps) => deleteImage(body),
    mutationKey: [DELETE_IMAGE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draft'] }).then(() => {});
    },
  });
};

