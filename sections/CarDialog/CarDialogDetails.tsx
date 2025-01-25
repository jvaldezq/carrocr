'use client';
import {Car} from "@/lib/definitions";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Carousel} from "@/components/Carousel";
import {Activity, CircleDollarSign, ReceiptText, Settings} from 'lucide-react';
import {CRCFormatter} from "@/lib/NumberFormats";

// TODO need to integrate this
const ContactInfoData = {
    acctId: 1,
    contactName: 'Jordan Valdez',
    contactEmail: 'jordanf.valdez@gmail.com',
    contactPhone: '(506) 8392-9383',
    acctVerified: true,
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQGe8yTcqObEog/profile-displayphoto-shrink_800_800/0/1542814433921?e=1728518400&v=beta&t=8a0wBtjGSnnTa-dXhACJfmLSrM47F-DD5HVZR0y2mEE',
    isDealer: false
}

export default function CarDialogDetails(props: Car) {
    const {
        make,
        model,
        thumbnail = CarPlaceholderImage.src,
        images,
        year,
        priceDollars,
        id,
        fuelType,
        transType,
        acctVerified,
        trim,
        condition,
        mileage,
    } = props;
    const {user} = useUser();
    const isBlurred = user ? undefined : 'relative blur justify-center items-center';


    return (
        <div className="overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col px-4 pt-4 border-b">
                <h2 className="text-2xl font-bold text-tertiary">
                    {make} {model}
                    <span className="text-sm font-light">{year}</span>
                </h2>
                <p className="text-lg text-primary flex gap-2 items-center">{trim}
                </p>
            </div>

            <Carousel images={[thumbnail, ...images]} model={model} rounded={false} showDots={true}/>

            {/* Car Details */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-tertiary">
                        Vehicle Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <ReceiptText className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="text-sm text-tertiary">Condition</p>
                                <p className="font-medium">{condition}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="text-sm text-tertiary">Mileage</p>
                                <p className="font-medium">{mileage.toLocaleString()} km</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="text-sm text-tertiary">Transmission</p>
                                <p className="font-medium">{transType}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <CircleDollarSign className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="text-sm text-tertiary">Price</p>
                                <p className="font-medium">{CRCFormatter(priceDollars)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-tertiary">
                        Seller Information
                    </h3>
                    {/*<div*/}
                    {/*    className="text-tertiary rounded-xl bg-primary/[0.07] p-3 w-fit relative flex justify-center items-center">*/}
                    {/*    <div className={`flex gap-2 self-start items-center ${isBlurred}`}>*/}
                    {/*        {ContactInfoData.thumbnail ? <Image*/}
                    {/*            className="object-cover aspect-auto rounded-full"*/}
                    {/*            src={ContactInfoData.thumbnail}*/}
                    {/*            alt="Imagen de perfil"*/}
                    {/*            width={40}*/}
                    {/*            height={40}*/}
                    {/*        /> : <div*/}
                    {/*            className='h-20 w-20 rounded-full font-semibold bg-primary/[0.5] text-white flex justify-center items-center'>*/}
                    {/*            {ContactInfoData.contactName.split(' ')*/}
                    {/*                .map(word => word[0].toUpperCase())*/}
                    {/*                .join('')}*/}
                    {/*        </div>}*/}
                    {/*        <div>*/}
                    {/*            <h4 className='font-medium text-base'>{isBlurred ? "No disponible" : ContactInfoData.contactName}</h4>*/}
                    {/*            {acctVerified &&*/}
                    {/*                <h4 className="font-medium text-xs text-info">{isBlurred ? 'No disponible' : 'Verificado'}</h4>}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    {*/}
                    {/*        isBlurred &&*/}
                    {/*        <Link key="login" href="/api/auth/login" className="absolute text-primary font-semibold">*/}
                    {/*            Iniciar sesión*/}
                    {/*        </Link>*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>)


    // return (<article
    //     className='text-tertiary grid grid-cols-1 gap-3 animate-fade animate-once animate-duration-[600ms] animate-delay-0 animate-ease-linear relative'>
    //     <div className='flex flex-col justify-between items-start'>
    //         <h1 className="text-2xl opacity-95 flex">{make} {model} <strong
    //             className='ml-1'>{year} </strong>
    //         </h1>
    //         <div className='flex grow justify-between gap-4 w-full'>
    //             <h1 className="text-xl">
    //                 {trim}
    //             </h1>
    //             <h2 className="text-xl font-semibold text-primary text-center">
    //                 {CRCFormatter(priceDollars)}
    //             </h2>
    //         </div>
    //     </div>
    //     <Carousel images={[thumbnail, ...images]} model={model} showDots={true}/>
    //     <div className="flex gap-4 md:flex-row justify-between items-center">
    //         <div
    //             className="text-tertiary rounded-xl bg-primary/[0.07] p-3 w-fit relative flex justify-center items-center">
    //             <div className={`flex gap-2 self-start items-center ${isBlurred}`}>
    //                 {ContactInfoData.thumbnail ? <Image
    //                     className="object-cover aspect-auto rounded-full"
    //                     src={ContactInfoData.thumbnail}
    //                     alt="Imagen de perfil"
    //                     width={40}
    //                     height={40}
    //                 /> : <div
    //                     className='h-20 w-20 rounded-full font-semibold bg-primary/[0.5] text-white flex justify-center items-center'>
    //                     {ContactInfoData.contactName.split(' ')
    //                         .map(word => word[0].toUpperCase())
    //                         .join('')}
    //                 </div>}
    //                 <div>
    //                     <h4 className='font-medium text-base'>{isBlurred ? "No disponible" : ContactInfoData.contactName}</h4>
    //                     {acctVerified &&
    //                         <h4 className="font-medium text-xs text-info">{isBlurred ? 'No disponible' : 'Verificado'}</h4>}
    //                 </div>
    //             </div>
    //             {
    //                 isBlurred &&
    //                 <Link key="login" href="/api/auth/login" className="absolute text-primary font-semibold">
    //                     Iniciar sesión
    //                 </Link>
    //             }
    //         </div>
    //         <Link key={id} href={`/car/${id}`} onClick={() => previewConfig.set({id: null})}
    //               className='text-secondary px-4 py-2 rounded border-primary flex w-fit ring-0 dark:focus-visible:ring-0 bg-primary focus-visible:ring-0 focus-visible:ring-offset-0'
    //         >
    //             Ver más
    //         </Link>
    //     </div>
    //     <div className='flex flex-col'>
    //         <div className='grid grid-cols-1 gap-1 divide-y mt-4 md:mt-0'>
    //             <div className='flex items-center gap-2'>
    //                 <h3 className="text-base font-bold">Estado</h3>
    //                 <CarRepairIcon/>
    //             </div>
    //             <div className='grid grid-cols-2 gap-2 py-2'>
    //                 {baseArticles.map((article, index) => {
    //                     if (!article.value) return null;
    //                     return (<article key={index}>
    //                         <p className="text-xs font-light">{article.title}</p>
    //                         <h3 className='text-base font-normal'>{article.value}</h3>
    //                     </article>)
    //                 })}
    //             </div>
    //         </div>
    //     </div>
    // </article>)
}