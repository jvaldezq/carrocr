import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

export const POST_IMAGE = 'postImage';

interface PostImageProps {
  imageFile: File;
}

const postProfileImage = async (
  body: PostImageProps,
  protectedAxios?: axios.AxiosInstance,
): Promise<string> => {
  const formdata = new FormData();
  formdata.append('imageFile', body.imageFile);
  formdata.append('fileRename', 'profile_picture');

  const res = await protectedAxios?.({
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
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (body: PostImageProps) =>
      postProfileImage(body, protectedAxios),
    mutationKey: [POST_IMAGE],
  });
};
