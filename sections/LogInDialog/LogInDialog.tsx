'use client';
import {Dialog, DialogContent, DialogOverlay} from "@/components/ui/dialog";
import {useCallback} from "react";
import {authConfig} from "@/store/authStore";
import {QueryClient, QueryClientProvider} from "react-query";
import {useStore} from "@nanostores/react";

function LogInContent() {
    const $authConfig = useStore(authConfig);

    const onClose = useCallback(() => {
        authConfig.set({isLogInOpen: false});
    }, []);

    return (
        <Dialog open={!!$authConfig.isLogInOpen} onOpenChange={onClose} modal={true}>
            <DialogOverlay className="bg-secondary/[0.1] PEPE"/>
            <DialogContent
                className="max-w-[95%] lg:max-w-fit h-fit max-h-[90%] overflow-scroll dark:bg-white color-primary rounded-2xl"
            >
                LogIn
                {/*{isLoading && <CarDialogDetailsSkeleton/>}*/}
                {/*{data && <CarDialogDetails {...data}/>}*/}
            </DialogContent>
        </Dialog>
    );
}

export default function LogInDialog() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <LogInContent/>
        </QueryClientProvider>
    );
}