import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

export const POST_IMAGE = 'postImage';

interface PostImageProps {
  imageFile: File;
  fileRename: string;
  listingID: number;
}

const postImage = async (
  body: PostImageProps,
  protectedAxios?: axios.AxiosInstance,
): Promise<string> => {
  const formdata = new FormData();
  formdata.append('imageFile', body.imageFile);
  formdata.append('fileRename', body.fileRename);
  formdata.append('listingID', `${body.listingID}`);

  const res = await protectedAxios?.({
    method: 'post',
    url: `/listing/image`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  });
  return res?.data;
};

export const usePostImage = () => {
  const { protectedAxios } = useUser();

  return useMutation({
    mutationFn: (body: PostImageProps) => postImage(body, protectedAxios),
    mutationKey: [POST_IMAGE],
  });
};
