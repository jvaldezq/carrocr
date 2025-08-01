import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const POST_IMAGE = 'postImage';

interface PostImageProps {
  imageFile: File;
  fileRename: string;
  listingId: number;
}

const postImage = async (body: PostImageProps): Promise<string> => {
  const formdata = new FormData();
  formdata.append('imageFile', body.imageFile);
  formdata.append('fileRename', body.fileRename);
  formdata.append('listingId', `${body.listingId}`);

  const res = await api?.({
    method: 'post',
    url: `docs/listing/image`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  });
  return res?.data;
};

export const usePostImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostImageProps) => postImage(body),
    mutationKey: [POST_IMAGE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draft'] }).then(() => {});
    },
  });
};
