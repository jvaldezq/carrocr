'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useCallback, useEffect, useMemo} from "react";
import {ComboboxController} from "@/components/Forms/ComboboxController";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useGetMakes, useGetModels} from "@/sections/CarEntry/service";
import Card from "@/components/Card/Card";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import {Car} from "@/lib/definitions";

export interface CreateCarInputs {
    make: string;
    model: string;
}

const schema = yup
    .object({
        make: yup.string().required('La marca es requerido').typeError('La marca es requerido'),
        model: yup.string().required('El modelo es requerido').typeError('El modelo es requerido'),
    })
    .required()

export const CreateCarContent = () => {
    const {
        handleSubmit, control, watch, resetField
    } = useForm<CreateCarInputs>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            make: '',
            model: ''
        }
    });

    const {data: dataMakes, isLoading: isMakesLoading} = useGetMakes();
    const make = watch('make');
    const {data: dataModels, isLoading: isModelsLoading} = useGetModels(parseInt(make));
    const model = watch('model');

    useEffect(() => {
        if (make) {
            resetField('model', {defaultValue: ''});
        }
    }, [make, resetField])
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
        model: dataModels?.find((modelItem) => modelItem.id === parseInt(model))?.name || '',
        trim: '',
        images: [],
        thumbnail: CarPlaceholderImage.src,
        make: dataMakes?.find((makeItem) => makeItem.id === parseInt(make))?.name || '',
        year: 0,
        priceDollars: 0,
        mileage: 0,
        transType: '',
        acctVerified: false,
        acctID: 0,
    } as unknown as Car;

    return <section
        className='h-full max-w-screen-xl mx-auto flex flex-col gap-2 items-center justify-items-center px-4 pt-6 pb-20 overflow-scroll'>
        <h1 className="text-2xl font-bold text-primary">¡Vamos a empezar!</h1>
        <p className="text-base text-tertiary text-opacity-95">Para comenzar, necesitamos la información básica de tu
            vehículo.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
                <ComboboxController control={control} name='make' placeholder='Marca' label='Marca'
                                    rules={{required: true}} data={makes} isLoading={isMakesLoading}/>
                <ComboboxController control={control} name='model' placeholder='Modelo' label='Modelo'
                                    rules={{required: true}} data={models} isLoading={isModelsLoading} show={!!make}/>
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