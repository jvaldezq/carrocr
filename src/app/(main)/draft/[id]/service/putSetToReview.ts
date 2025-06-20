import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const SET_TO_REVIEW = 'setToReview';

const putSetToReview = async (id: string | number) => {
  const res = await api?.put(`/user/listing/setReview/${id}`);
  return res?.data;
};

export const useSetToReview = () => {
  return useMutation({
    mutationFn: (id: string | number) => putSetToReview(id),
    mutationKey: [SET_TO_REVIEW],
  });
};
