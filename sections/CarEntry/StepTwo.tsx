// 'use client';
//
// import {SubmitHandler, useForm} from "react-hook-form";
// import {ChangeEvent, useCallback, useState} from "react";
// import {ComboboxController} from "@/components/Forms/ComboboxController";
// import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import {useCreateMutation} from "@/sections/CarEntry/service";
// import {Button} from "@/components/ui/button";
// import {useRouter} from "next/navigation";
// import {CONDITIONS} from "@/lib/conditions";
// import {InputController} from "@/components/Forms/InputController";
// import {FUEL_TYPES} from "@/lib/fuelTypes";
// import {FileInputController} from "@/components/Forms/FileInputController";
// import CarPlaceholderImage from "@/assets/car-placeholder.webp";
// import Image from "next/image";
// import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
// import {CheckSquareIcon} from "@/icons/CheckSquare";
// import {cn} from "@/lib/utils";
//
// export interface CreateCarInputs {
//     condition?: string;
//     fuelType?: string;
//     mileage?: number;
//     piriceColones?: number;
// }
//
// export interface FilesProps {
//     thumbnail?: Blob | MediaSource,
//     imgBodyFL?: Blob | MediaSource,
//     imgBodyFR?: Blob | MediaSource,
//     imgBodyRL?: Blob | MediaSource,
//     imgBodyRR?: Blob | MediaSource,
//     imgInteriorDash?: Blob | MediaSource,
//     imgInteriorCluster?: Blob | MediaSource,
//     imgInteriorRadio?: Blob | MediaSource,
//     imgInteriorSeatF?: Blob | MediaSource,
//     imgInteriorSeatR?: Blob | MediaSource,
//     imgInteriorTrunk?: Blob | MediaSource,
//     imgEngine?: Blob | MediaSource,
// }
//
// interface FilesListProps {
//     name: keyof FilesProps;
//     label: string;
//     disclaimer?: boolean;
// }
//
// const filesList: FilesListProps[] = [
//     {name: 'imgBodyFL', label: 'Frente Izquierdo'},
//     {name: 'imgBodyFR', label: 'Frente Derecho'},
//     {name: 'imgBodyRL', label: 'Trasero Izquierdo'},
//     {name: 'imgBodyRR', label: 'Trasero Derecho'},
//     {name: 'imgInteriorDash', label: 'Tablero', disclaimer: true},
//     {name: 'imgInteriorCluster', label: 'Velocímetro', disclaimer: true},
//     {name: 'imgInteriorRadio', label: 'Radio', disclaimer: true},
//     {name: 'imgInteriorSeatF', label: 'Asiento Delantero', disclaimer: true},
//     {name: 'imgInteriorSeatR', label: 'Asiento Trasero', disclaimer: true},
//     {name: 'imgInteriorTrunk', label: 'Maletero', disclaimer: true},
//     {name: 'imgEngine', label: 'Motor', disclaimer: true},
// ];
//
// const defaultValues = {}
//
// export const StepTwoContent = () => {
//     const [files, setFiles] = useState<FilesProps>();
//     const router = useRouter()
//     const {
//         handleSubmit, control, watch, resetField, trigger
//     } = useForm<CreateCarInputs>({
//         mode: 'onChange', defaultValues: defaultValues
//     });
//     const {mutateAsync: createListing, isPending} = useCreateMutation();
//
//     const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>, name: keyof FilesProps) => {
//         if (e.target.files && e.target.files[0]) {
//             setFiles((prevFiles) => ({
//                 ...prevFiles, [name]: e?.target?.files?.[0]!,
//             }));
//         }
//     }, []);
//
//     const onSubmit: SubmitHandler<CreateCarInputs> = useCallback((data) => {
//         const formData = {
//             ...data,
//             thumbnail: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-6771499861641859342-1024x768.jpeg",
//             imgBodyFL: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-6771499861641859342-1024x768.jpeg",
//             imgBodyFR: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-1511291335503804214-1024x768.jpeg",
//             imgBodyRL: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-987520084229423317-1024x768.jpeg",
//             imgBodyRR: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-7723154306807153330-1024x768.jpeg",
//             imgInteriorDash: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-3019843391839520986-1024x768.jpeg",
//             imgInteriorCluster: "https://static.cargurus.com/images/forsale/2024/04/18/07/55/2017_porsche_911-pic-4078727408758134758-1024x768.jpeg",
//             imgInteriorRadio: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/dashInfotrainment-negate.jpg",
//             imgInteriorSeatF: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/seatFront-negate.jpg",
//             imgInteriorSeatR: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/seatRear-negate.jpg",
//             imgInteriorTrunk: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/trunk-negate.jpg",
//             imgEngine: "http://bmcloud9.com/images/carrocr/sampleCar/embossed/engine-negate.jpg",
//         }
//         // createListing(formData).then(() => {
//         //     console.log(data)
//         //     console.log('success');
//         // });
//     }, []);
//
//     return <section
//         className='h-full max-w-screen-xl mx-auto flex flex-col gap-2 items-center justify-items-center px-4 pt-6'>
//         <h1 className="text-2xl font-bold text-primary">Detalles de tu vehículo</h1>
//         <p className="text-base text-tertiary text-opacity-95">Para que nuestro equipo pueda revisar tu vehículo,
//             necesitamos que nos brindes la mayor cantidad de detalles posible. Esto también aumentará su visibilidad.
//             Podrás completar la información de tu vehículo en cualquier momento en el futuro.</p>
//
//         <div className="flex flex-col gap-8 mt-8 w-full pb-20">
//             <form id="car-entry" onSubmit={handleSubmit(onSubmit)}
//                   className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-fit'>
//                 <ComboboxController control={control} name='fuelType' placeholder='Combustible'
//                                     label='Combustible'
//                                     data={FUEL_TYPES}/>
//                 <ComboboxController control={control} name='condition' placeholder='Condición' label='Condición'
//                                     data={CONDITIONS}/>
//                 <InputController control={control} name='mileage' type='mileage' placeholder='Kilometraje'
//                                  label='Kilometraje'/>
//                 <InputController control={control} name='piriceColones' type='priceColones' placeholder='Precio'
//                                  label='Precio'/>
//             </form>
//             <h1 className="text-2xl font-bold text-primary">Fotografías</h1>
//             <p className="flex gap-2 items-center text-base text-tertiary text-opacity-95">
//                 <CheckSquareIcon
//                     id="check-square"
//                     className={cn(
//                         "transition-all duration-500",
//                         'opacity-15 text-error'
//                     )}/>
//                 Las imágenes con los siguientes íconos son obligatorias para enviar la revisión.</p>
//             <Accordion type="single" collapsible className="w-full">
//                 {
//                     filesList.map(({name, label, disclaimer}) => (<AccordionItem value={name} key={name}>
//                         <AccordionTrigger className="text-tertiary [&[data-state=open]>#check-square]:rotate-0">
//                             <p className="flex gap-2 items-center">
//                                 <CheckSquareIcon
//                                     id="check-square"
//                                     className={cn(
//                                         "transition-all duration-500",
//                                         files?.[name] ? 'text-success' : disclaimer ? 'opacity-15' : 'opacity-15 text-error'
//                                     )}/>
//                                 {label}
//                             </p>
//                         </AccordionTrigger>
//                         <AccordionContent>
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
//                                 <Image
//                                     className="object-cover aspect-auto rounded-2xl justify-self-center self-center w-full h-[405px] animate-fade-right animate-once animate-duration-500 animate-ease-linear"
//                                     src={CarPlaceholderImage}
//                                     alt="Placeholder Frente Delantero"
//                                     width={720}
//                                     height={405}
//                                 />
//
//                                 <FileInputController name={name} type='file'
//                                                      label='Frente Delantero' onChange={handleFileChange}
//                                                      file={files?.[name]}/>
//                             </div>
//                         </AccordionContent>
//                     </AccordionItem>))
//                 }
//             </Accordion>
//         </div>
//
//         <div id="car-entry-footer" className="fixed flex flex-col bottom-0 justify-end w-full py-2 px-4 bg-secondary">
//             <div className="grid grid-cols-3 gap-4 mb-2">
//                 <hr className="h-[5px] bg-primary rounded animate-fade-left animate-once animate-duration-500 animate-ease-linear"/>
//                 <hr className="h-[5px] bg-primary rounded animate-fade-left animate-once animate-duration-500 animate-delay-300 animate-ease-linear"/>
//                 <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-[600ms] animate-ease-linear"/>
//             </div>
//             <div className="flex justify-between">
//                 <Button
//                     variant="link"
//                     onClick={() => router.push('/profile')}
//                     className='rounded py-1 px-2 text-primary text-lg w-fit animate-fade animate-once animate-duration-500 animate-delay-1000 animate-ease-linear'>terminar
//                     más tarde</Button>
//                 <Button
//                     type="submit" form="car-entry"
//                     className='bg-primary rounded py-1 px-2 text-secondary text-lg w-fit animate-fade animate-once animate-duration-500 animate-delay-1000 animate-ease-linear'>Siguiente</Button>
//             </div>
//         </div>
//
//     </section>
// }
//
// export default function StepTwo() {
//     const queryClient = new QueryClient({
//         queryCache: new QueryCache({
//             onError: error => {
//                 console.error('Error:', error)
//             }
//         })
//     });
//     return (<QueryClientProvider client={queryClient}>
//         <StepTwoContent/>
//     </QueryClientProvider>);
// }