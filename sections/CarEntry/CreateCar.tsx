'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useCallback, useEffect, useMemo} from "react";
import {ComboboxController} from "@/components/Forms/ComboboxController";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useGetMakes, useGetModels, useGetTrims} from "@/sections/CarEntry/service";
import Card from "@/components/Card/Card";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import {Car} from "@/lib/definitions";
import {InputController} from "@/components/Forms/InputController";
import {YEARS} from "@/lib/years";

export interface CreateCarInputs {
    makeId: string;
    modelId: string;
    trimId: string;
    bodyId: string;
    year: string;
    license: string;
}

const defaultValues = {
    makeId: '',
    modelId: '',
    trimId: '',
    bodyId: '',
    year: '',
    license: ''
}

const schema = yup
    .object({
        makeId: yup.string().required('La marca es requerido').typeError('La marca es requerido'),
        modelId: yup.string().required('El modelo es requerido').typeError('El modelo es requerido'),
        trimId: yup.string().required('La edición es requerido').typeError('La edición es requerido'),
        bodyId: yup.string().required('La carrocería es requerido').typeError('La carrocería es requerido'),
        year: yup.string().required('El año es requerido').typeError('El año es requerido'),
        license: yup.string().matches(/^[A-Za-z]{3}-\d{3}$|^\d{1,6}$/, {
            message: 'La placa debe tener el formato correcto',
        }).required('La placa es requerido').typeError('La placa es requerido'),
    })
    .required()

export const CreateCarContent = () => {
    const {
        handleSubmit, control, watch, resetField
    } = useForm<CreateCarInputs>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: defaultValues
    });

    const makeId = watch('makeId');
    const modelId = watch('modelId');
    const trimId = watch('trimId');
    const bodyId = watch('bodyId');
    const year = watch('year');

    const {data: dataMakes, isLoading: isMakesLoading} = useGetMakes();
    const {data: dataModels, isLoading: isModelsLoading} = useGetModels(parseInt(makeId));
    const {data: dataTrims, isLoading: isTrimsLoading} = useGetTrims(parseInt(modelId));

    useEffect(() => {
        if (makeId) {
            resetField('modelId', {defaultValue: ''});
        }
    }, [makeId, resetField]);

    const makes = useMemo(() => dataMakes?.map((make) => ({
        value: make.name,
        label: make.name,
        id: make.value
    })) || [], [dataMakes])
    const models = useMemo(() => dataModels?.map((make) => ({
        value: make.name,
        label: make.name,
        id: make.value
    })) || [], [dataModels])

    const onSubmit: SubmitHandler<CreateCarInputs> = useCallback((data) => {
        console.log(data)
    }, []);

    const cardData = {
        id: 0,
        model: dataModels?.find((modelItem) => modelItem.value === parseInt(modelId))?.name || '',
        trim: dataModels?.find((modelItem) => modelItem.value === parseInt(modelId))?.name || '', //TODO need to integrate trims
        images: [],
        thumbnail: CarPlaceholderImage.src,
        make: dataMakes?.find((makeItem) => makeItem.value === parseInt(makeId))?.name || '',
        year: year,
        priceDollars: 0,
        mileage: 0,
        transType: '',
        acctVerified: false,
        acctID: 0,
    } as unknown as Car;

    console.log('dataTrims', dataTrims)

    return <section
        className='h-full max-w-screen-xl mx-auto flex flex-col gap-2 items-center justify-items-center px-4 pt-6 pb-20 overflow-scroll'>
        <h1 className="text-2xl font-bold text-primary">¡Vamos a empezar!</h1>
        <p className="text-base text-tertiary text-opacity-95">Para comenzar, necesitamos la información básica de tu
            vehículo.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-fit'>
                <ComboboxController control={control} name='makeId' placeholder='Marca' label='Marca'
                                    rules={{required: true}} data={makes} isLoading={isMakesLoading}/>
                <ComboboxController control={control} name='modelId' placeholder='Modelo' label='Modelo'
                                    rules={{required: true}} data={models} isLoading={isModelsLoading} show={!!makeId}/>
                <ComboboxController control={control} name='trimId' placeholder='Edición' label='Edición'
                                    rules={{required: true}} data={models} isLoading={isTrimsLoading}
                                    show={!!modelId}/>
                <ComboboxController control={control} name='bodyId' placeholder='Sistema' label='Sistema'
                                    rules={{required: true}} data={models} isLoading={isModelsLoading} show={!!trimId}/>
                <ComboboxController control={control} name='year' placeholder='Año' label='Año'
                                    rules={{required: true}} data={YEARS} isLoading={isModelsLoading} show={!!trimId}/>
                <InputController control={control} name='license' type='license' placeholder='CRT-123'
                                 label='Placa' rules={{required: true}} show={!!year}/>
            </form>
            <Card {...cardData}/>
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
    return (
        <QueryClientProvider client={queryClient}>
            <CreateCarContent/>
        </QueryClientProvider>
    );
}