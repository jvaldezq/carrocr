'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {ChangeEvent, useCallback, useState} from "react";
import {ComboboxController} from "@/components/Forms/ComboboxController";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useCreateMutation} from "@/sections/CarEntry/service";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {CONDITIONS} from "@/lib/conditions";
import {InputController} from "@/components/Forms/InputController";
import {FUEL_TYPES} from "@/lib/fuelTypes";
import {FileInputController} from "@/components/Forms/FileInputController";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import Image from "next/image";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {CheckSquareIcon} from "@/icons/CheckSquare";
import {cn} from "@/lib/utils";

export interface CreateCarInputs {
    condition?: string;
    fuelType?: string;
    mileage?: number;
    piriceColones?: number;
}

export interface FilesProps {
    thumbnail?: Blob | MediaSource,
    img1FronL?: Blob | MediaSource,
    img2FronR?: Blob | MediaSource,
    img3RearL?: Blob | MediaSource,
    img4RearR?: Blob | MediaSource,
    img5IntDash?: Blob | MediaSource,
    img6IntClust?: Blob | MediaSource,
    img7IntRad?: Blob | MediaSource,
    img8IntSeatF?: Blob | MediaSource,
    img9IntSeatB?: Blob | MediaSource,
    img10IntTrun?: Blob | MediaSource,
    img11Engine?: Blob | MediaSource,
}

interface FilesListProps {
    name: keyof FilesProps;
    label: string;
    disclaimer?: boolean;
}

const filesList: FilesListProps[] = [
    {name: 'img1FronL', label: 'Frente Izquierdo'},
    {name: 'img2FronR', label: 'Frente Derecho'},
    {name: 'img3RearL', label: 'Trasero Izquierdo'},
    {name: 'img4RearR', label: 'Trasero Derecho'},
    {name: 'img5IntDash', label: 'Tablero', disclaimer: true},
    {name: 'img6IntClust', label: 'Velocímetro', disclaimer: true},
    {name: 'img7IntRad', label: 'Radio', disclaimer: true},
    {name: 'img8IntSeatF', label: 'Asiento Delantero', disclaimer: true},
    {name: 'img9IntSeatB', label: 'Asiento Trasero', disclaimer: true},
    {name: 'img10IntTrun', label: 'Maletero', disclaimer: true},
    {name: 'img11Engine', label: 'Motor', disclaimer: true},
];

const defaultValues = {}

export const StepTwoContent = () => {
    const [files, setFiles] = useState<FilesProps>();
    const router = useRouter()
    const {
        handleSubmit, control, watch, resetField, trigger
    } = useForm<CreateCarInputs>({
        mode: 'onChange', defaultValues: defaultValues
    });
    const {mutateAsync: createListing, isPending} = useCreateMutation();

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>, name: keyof FilesProps) => {
        if (e.target.files && e.target.files[0]) {
            setFiles((prevFiles) => ({
                ...prevFiles, [name]: e?.target?.files?.[0]!,
            }));
        }
    }, []);

    const onSubmit: SubmitHandler<CreateCarInputs> = useCallback((data) => {
        const formData = {
            ...data,
            thumbnail: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-6771499861641859342-1024x768.jpeg",
            img1FronL: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-6771499861641859342-1024x768.jpeg",
            img2FronR: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-1511291335503804214-1024x768.jpeg",
            img3RearL: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-987520084229423317-1024x768.jpeg",
            img4RearR: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-7723154306807153330-1024x768.jpeg",
            img5IntDash: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-3019843391839520986-1024x768.jpeg",
            img6IntClust: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-4078727408758134758-1024x768.jpeg",
            img7IntRad: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/dashInfotrainment-negate.jpg",
            img8IntSeatF: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/seatFront-negate.jpg",
            img9IntSeatB: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/seatRear-negate.jpg",
            img10IntTrun: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/trunk-negate.jpg",
            img11Engine: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/engine-negate.jpg",
        }
        // createListing(formData).then(() => {
        //     console.log(data)
        //     console.log('success');
        // });
    }, []);

    return <section
        className='h-full max-w-screen-xl mx-auto flex flex-col gap-2 items-center justify-items-center px-4 pt-6'>
        <h1 className="text-2xl font-bold text-primary">Detalles de tu vehículo</h1>
        <p className="text-base text-tertiary text-opacity-95">Para que nuestro equipo pueda revisar tu vehículo,
            necesitamos que nos brindes la mayor cantidad de detalles posible. Esto también aumentará su visibilidad.
            Podrás completar la información de tu vehículo en cualquier momento en el futuro.</p>

        <div className="flex flex-col gap-8 mt-8 w-full pb-20">
            <form id="car-entry" onSubmit={handleSubmit(onSubmit)}
                  className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-fit'>
                <ComboboxController control={control} name='fuelType' placeholder='Combustible'
                                    label='Combustible'
                                    data={FUEL_TYPES}/>
                <ComboboxController control={control} name='condition' placeholder='Condición' label='Condición'
                                    data={CONDITIONS}/>
                <InputController control={control} name='mileage' type='mileage' placeholder='Kilometraje'
                                 label='Kilometraje'/>
                <InputController control={control} name='piriceColones' type='priceColones' placeholder='Precio'
                                 label='Precio'/>
            </form>
            <h1 className="text-2xl font-bold text-primary">Fotografías</h1>
            <p className="flex gap-2 items-center text-base text-tertiary text-opacity-95">
                <CheckSquareIcon
                    id="check-square"
                    className={cn(
                        "transition-all duration-500",
                        'opacity-15 text-error'
                    )}/>
                Las imágenes con los siguientes íconos son obligatorias para enviar la revisión.</p>
            <Accordion type="single" collapsible className="w-full">
                {
                    filesList.map(({name, label, disclaimer}) => (<AccordionItem value={name} key={name}>
                        <AccordionTrigger className="text-tertiary [&[data-state=open]>#check-square]:rotate-0">
                            <p className="flex gap-2 items-center">
                                <CheckSquareIcon
                                    id="check-square"
                                    className={cn(
                                        "transition-all duration-500",
                                        files?.[name] ? 'text-success' : disclaimer ? 'opacity-15' : 'opacity-15 text-error'
                                    )}/>
                                {label}
                            </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                                <Image
                                    className="object-cover aspect-auto rounded-2xl justify-self-center self-center w-full h-[405px] animate-fade-right animate-once animate-duration-500 animate-ease-linear"
                                    src={CarPlaceholderImage}
                                    alt="Placeholder Frente Delantero"
                                    width={720}
                                    height={405}
                                />

                                <FileInputController name={name} type='file'
                                                     label='Frente Delantero' onChange={handleFileChange}
                                                     file={files?.[name]}/>
                            </div>
                        </AccordionContent>
                    </AccordionItem>))
                }
            </Accordion>
        </div>

        <div id="car-entry-footer" className="fixed flex flex-col bottom-0 justify-end w-full py-2 px-4 bg-secondary">
            <div className="grid grid-cols-3 gap-4 mb-2">
                <hr className="h-[5px] bg-primary rounded animate-fade-left animate-once animate-duration-500 animate-ease-linear"/>
                <hr className="h-[5px] bg-primary rounded animate-fade-left animate-once animate-duration-500 animate-delay-300 animate-ease-linear"/>
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-[600ms] animate-ease-linear"/>
            </div>
            <div className="flex justify-between">
                <Button
                    variant="link"
                    onClick={() => router.push('/profile')}
                    className='rounded py-1 px-2 text-primary text-lg w-fit animate-fade animate-once animate-duration-500 animate-delay-1000 animate-ease-linear'>terminar
                    más tarde</Button>
                <Button
                    type="submit" form="car-entry"
                    className='bg-primary rounded py-1 px-2 text-secondary text-lg w-fit animate-fade animate-once animate-duration-500 animate-delay-1000 animate-ease-linear'>Siguiente</Button>
            </div>
        </div>

    </section>
}

export default function StepTwo() {
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: error => {
                console.error('Error:', error)
            }
        })
    });
    return (<QueryClientProvider client={queryClient}>
        <StepTwoContent/>
    </QueryClientProvider>);
}