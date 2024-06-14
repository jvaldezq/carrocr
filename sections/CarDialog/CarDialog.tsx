'use client';
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useCallback} from "react";
import {useStore} from "@nanostores/react";
import {previewConfig} from "@/store/previewStore";
import {useGetCar} from "@/sections/CarDialog/service";
import {CarDialogDetailsSkeleton} from "@/sections/CarDialog/CarDialogDetailsSkeleton";
import CarDialogDetails from "@/sections/CarDialog/CarDialogDetails";
import {QueryClient, QueryClientProvider} from "react-query";

function CarDialogContent() {
    const $previewConfig = useStore(previewConfig);

    const {data, isLoading} = useGetCar($previewConfig?.id || 0);
    
    const onClose = useCallback(() => {
        previewConfig.set({id: null});
    }, []);

    return (
        <Dialog open={!!$previewConfig.id} onOpenChange={onClose}>
            <DialogContent
                className="max-w-[95%] lg:max-w-[850px] h-fit max-h-[90%] overflow-scroll dark:bg-white color-primary rounded-2xl"
            >
                {isLoading && <CarDialogDetailsSkeleton/>}
                {data && <CarDialogDetails {...data}/>}
            </DialogContent>
        </Dialog>
    );
}

export default function CarDialog() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <CarDialogContent/>
        </QueryClientProvider>
    );
}