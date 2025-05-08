import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const POST_IMAGE = 'postImage';

interface PostImageProps {
  imageFile: File;
}

const postProfileImage = async (body: PostImageProps): Promise<string> => {
  const formdata = new FormData();
  formdata.append('imageFile', body.imageFile);
  formdata.append('fileRename', 'profile_picture');

  const res = await api?.({
    method: 'post',
    url: `/user/image`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  });
  return res?.data;
};

export const usePostProfileImage = () => {
  return useMutation({
    mutationFn: (body: PostImageProps) => postProfileImage(body),
    mutationKey: [POST_IMAGE],
  });
};
