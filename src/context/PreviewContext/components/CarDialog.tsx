'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePreview } from '@/context/PreviewContext/PreviewContext';
import { useGetCar } from '@/context/PreviewContext/service/getCar';
import { CarDialogDetailsSkeleton } from '@/context/PreviewContext/components/CarDialogDetailsSkeleton';
import CarDialogDetails from '@/context/PreviewContext/components/CarDialogDetails';

export const CarDialog = () => {
  const { id, clearId } = usePreview();
  const { data, isLoading } = useGetCar(id);

  return (
    <Dialog open={!!id} onOpenChange={clearId}>
      <DialogContent className="max-w-[95%] h-fit lg:max-w-[850px] max-h-[90%] overflow-scroll dark:bg-white color-primary rounded-2xl p-0">
        <DialogTitle className="hidden" />
        {isLoading && <CarDialogDetailsSkeleton />}
        {data && <CarDialogDetails {...data} />}
      </DialogContent>
    </Dialog>
  );
};
