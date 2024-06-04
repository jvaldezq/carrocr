'use client';
import {Dialog, DialogContent, DialogOverlay} from "@/components/ui/dialog";
import {useCallback} from "react";
import {authConfig} from "@/store/authStore";
import {QueryClient, QueryClientProvider} from "react-query";
import {useStore} from "@nanostores/react";
import LogoImage from "@/assets/carrocr-logo.webp";
import Image from "next/image";
import {SubmitHandler} from "react-hook-form";
import {LoginForm, LoginInputs} from "@/sections/LogInDialog/LoginForm";

function LogInContent() {
    const $authConfig = useStore(authConfig);

    const onClose = useCallback(() => {
        authConfig.set({isLogInOpen: false});
    }, []);

    const onSubmit: SubmitHandler<LoginInputs> = useCallback((data) => {
        console.log(data)
    }, []);

    return (
        <Dialog open={!!$authConfig.isLogInOpen} onOpenChange={onClose} modal={true}>
            <DialogOverlay className="bg-secondary/[0.1]"/>
            <DialogContent
                className="max-w-[95%] w-full h-full md:w-fit md:h-fit max-h-[90%] overflow-scroll dark:bg-secondary rounded-2xl flex flex-col gap-4 justify-center items-center"
            >
                <Image className="object-cover aspect-auto mt-4" src={LogoImage} alt="Carro CR Logo" priority={true}/>
                <LoginForm onSubmit={onSubmit}/>
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