import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DOCTS_POST_USER_IMAGE } from '@/lib/queryKeys';

interface Props {
  imageFile: File;
  fileName: string;
}

const postUserImage = async (body: Props): Promise<string> => {
  const formdata = new FormData();
  formdata.append('imageFile', body.imageFile);
  formdata.append('fileRename', body.fileName);

  const res = await api({
    method: 'post',
    url: `/docs/user/image`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  });
  return res?.data;
};

export const usePostUserImage = () => {
  return useMutation({
    mutationFn: (body: Props) => postUserImage(body),
    mutationKey: [DOCTS_POST_USER_IMAGE],
  });
};
