'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useCallback} from "react";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useCreateMutation, useGetMakes, useGetModels, useGetTrims, useGetTypeBodies} from "@/sections/CarEntry/service";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {CreateCarWrapper} from "@/sections/CarEntry/CreateCarWrapper";

export interface CreateCarInputs {
    makeId: string;
    modelId: string;
    trimId: string;
    bodyId: string;
    year: string;
    license: string;
}

const defaultValues = {
    makeId: '', modelId: '', trimId: '', bodyId: '', year: '2024', license: ''
}

const schema = yup
    .object({
        makeId: yup.string().required('La marca es requerido').typeError('La marca es requerido'),
        modelId: yup.string().required('El modelo es requerido').typeError('El modelo es requerido'),
        bodyId: yup.string().required('La carrocería es requerido').typeError('La carrocería es requerido'),
        trimId: yup.string().required('La edición es requerido').typeError('La edición es requerido'),
        year: yup.string().required('El año es requerido').typeError('El año es requerido'),
        license: yup.string().matches(/^[A-Za-z]{3}-\d{3}$|^\d{1,6}$|^[A-Za-z]{3}\d{3}$/, {
            message: 'La placa debe tener el formato correcto',
        }).required('La placa es requerido').typeError('La placa es requerido'),
    })
    .required()

export const CreateCarContent = () => {
    const router = useRouter()
    const {
        handleSubmit, control, watch, formState: {isDirty}
    } = useForm<CreateCarInputs>({
        resolver: yupResolver(schema), mode: 'onChange', defaultValues: defaultValues
    });
    const {mutateAsync: createListing, isPending} = useCreateMutation();

    const {makeId, year, bodyId, trimId, modelId} = watch();

    const {data: makes, isLoading: isMakesLoading} = useGetMakes();
    const {data: typeBodies, isLoading: isTypeBodyLoading} = useGetTypeBodies();
    const {data: models, isLoading: isModelsLoading} = useGetModels(parseInt(makeId));
    const {data: trims, isLoading: isTrimsLoading} = useGetTrims(parseInt(modelId));

    const onSubmit: SubmitHandler<CreateCarInputs> = useCallback((data) => {
        createListing(data).then((id) => {
            router.push(`/car-entry/step-two/${id}`);
        });
    }, [createListing, router]);

    // const cardData = useMemo(() => {
    //     return {
    //         model: models?.find((model) => model.id === +modelId)?.label || '',
    //         trim: trims?.find((trim) => trim.id === +trimId)?.label || '',
    //         thumbnail: CarPlaceholderImage.src,
    //         make: makes?.find((make) => make?.id === +makeId)?.label || '',
    //         year: year,
    //         transType: '',
    //         acctVerified: false,
    //     } as unknown as Car
    // }, [makeId, makes, modelId, models, trimId, trims, year]);

    return <section
        className='h-full max-w-screen-xl mx-auto flex flex-col gap-2 items-center justify-items-center px-4 pt-6 pb-20'>
        <h1 className="text-2xl font-bold text-primary">¡Vamos a empezar!</h1>
        <p className="text-base text-tertiary text-opacity-95">Para comenzar, necesitamos la información básica de tu
            vehículo.</p>
        <div className="flex flex-col gap-8 mt-8 justify-center items-center w-full">
            <CreateCarWrapper/>
            {/*<form id="car-entry" onSubmit={handleSubmit(onSubmit)}*/}
            {/*      className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-fit'>*/}
            {/*    <ComboboxController control={control} name='makeId' placeholder='Marca' label='Marca'*/}
            {/*                        rules={{required: true}} data={makes || []} isLoading={isMakesLoading}/>*/}
            {/*    <ComboboxController control={control} name='modelId' placeholder='Modelo' label='Modelo'*/}
            {/*                        rules={{required: true}} data={models || []} isLoading={isModelsLoading}*/}
            {/*                        show={!!makeId}/>*/}
            {/*    <ComboboxController control={control} name='trimId' placeholder='Edición' label='Edición'*/}
            {/*                        rules={{required: true}} data={trims || []} isLoading={isTrimsLoading}*/}
            {/*                        show={!!modelId}/>*/}
            {/*    <ComboboxController control={control} name='bodyId' placeholder='Tipo' label='Tipo'*/}
            {/*                        rules={{required: true}} data={typeBodies || []} isLoading={isModelsLoading}*/}
            {/*                        show={!!trimId}/>*/}
            {/*    <ComboboxController control={control} name='year' placeholder='Año' label='Año'*/}
            {/*                        rules={{required: true}} data={YEARS} isLoading={isModelsLoading} show={!!bodyId}/>*/}
            {/*    <InputController control={control} name='license' type='license' placeholder='CRT-123'*/}
            {/*                     label='Placa' rules={{required: true}} show={!!bodyId}/>*/}
            {/*</form>*/}
            <div
                className="grid grid-cols-1 md:grid-cols-3">
                <div className='col-start-2'>
                    {/*<Card {...cardData}/>*/}
                </div>
            </div>
        </div>
        <div id="car-entry-footer"
             className="fixed flex flex-col bottom-0 justify-end w-full py-2 px-4 bg-secondary">
            <div className="grid grid-cols-3 gap-4 mb-2">
                <hr className="h-[5px] bg-primary rounded animate-fade-left animate-once animate-duration-500 animate-ease-linear"/>
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-300 animate-ease-linear"/>
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-[600ms] animate-ease-linear"/>
            </div>
            <Button
                type="submit" form="car-entry"
                className='bg-primary rounded py-1 px-2 text-secondary text-lg w-fit self-end animate-fade animate-once animate-duration-500 animate-delay-1000 animate-ease-linear'>Siguiente</Button>
        </div>
    </section>
}

export default function CreateCar() {
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: error => {
                console.error('Error:', error)
            }
        })
    });
    return (<QueryClientProvider client={queryClient}>
        <CreateCarContent/>
    </QueryClientProvider>);
}