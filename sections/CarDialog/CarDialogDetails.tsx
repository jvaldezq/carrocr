'use client';
import {EngineIcon} from "@/icons/EngineIcon";
import {TransmissionIcon} from "@/icons/TransmissionIcon";
import {CarRepairIcon} from "@/icons/CarRepairIcon";
import {Carousel} from "@/components/Carousel";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import {Car} from "@/lib/definitions";
import CarPlaceholderImage from "@/assets/car-placeholder.webp";
import {previewConfig} from "@/store/previewStore";
import Link from "next/link";
import {SellerIcon} from "@/icons/SellerIcon";
import {VerifiedIcon} from "@/icons/VerifiedIcon";


export default function CarDialogDetails(props: Car) {
    const {
        make,
        model,
        thumbnail = CarPlaceholderImage.src,
        images,
        year,
        priceDollars,
        id,
        engineSizeCC,
        fuelType,
        economyL100Km,
        transType,
        acctVerified,
        trim,
        engineHp,
        condition,
        engineCylinders,
        engineTqNm,
        driveSystemAlt,
        driveSystem,
        mileage,
        transGears
    } = props;

    return (<article
        className='text-tertiary grid grid-cols-1 gap-3 animate-fade animate-once animate-duration-[600ms] animate-delay-0 animate-ease-linear relative'>
        <div className='flex flex-col justify-between items-start'>
            <h1 className="text-lg font-semibold">{make} {model} ({year})</h1>
            <div className='flex grow justify-between w-full'>
                <h1 className="text-xl font-medium">
                    {trim}
                </h1>
                <h2 className="text-xl font-semibold text-primary text-center">
                    {USDFormatter(priceDollars)}
                </h2>
            </div>
        </div>
        <Carousel images={[thumbnail, ...images]} model={model}/>
        <Link key={id} href={`/car/${id}`} onClick={() => previewConfig.set({id: null})}
              className='text-primary  justify-self-end px-4 py-2 rounded border-primary flex align-middle self-end w-fit ring-0 dark:focus-visible:ring-0 bg-primary/[0.1] focus-visible:ring-0 focus-visible:ring-offset-0'
        >
            Ver anuncio
        </Link>
        <div className='flex flex-col'>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4 md:mt-0'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Estado</h3>
                    <CarRepairIcon/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <p className='text-sm font-light'>Kilometraje: <span
                        className='text-base font-normal'>{NumberFormatter(mileage)}km</span>
                    </p>
                    <p className='text-sm font-light'>Calificación: <span
                        className='text-base font-normal'>{condition}</span>
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Motor</h3>
                    <EngineIcon/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <p className='text-sm font-light'>Tamaño: <span
                        className='text-base font-normal'>{engineSizeCC}cc</span></p>
                    <p className='text-sm font-light'>Cilindros: <span
                        className='text-base font-normal'>{engineCylinders}</span>
                    </p>
                    <p className='text-sm font-light'>Fuerza: <span
                        className='text-base font-normal'>{engineHp}HP</span></p>
                    <p className='text-sm font-light'>Torque: <span
                        className='text-base font-normal'>{engineTqNm}Nm</span></p>
                    <p className='text-sm font-light'>Combustible: <span
                        className='text-base font-normal'>{fuelType}</span>
                    </p>
                    <p className='text-sm font-light'>Economía: <span
                        className='text-base font-normal'>{economyL100Km} Km/L</span>
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Transmisión</h3>
                    <TransmissionIcon/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <p className='text-sm font-light'>Tipo: <span
                        className='text-base font-normal'>{transType}</span></p>
                    <p className='text-sm font-light'>Sistema: <span
                        className='text-base font-normal'>{driveSystem} ({driveSystemAlt})</span></p>
                    <p className='text-sm font-light'>Velocidades: <span
                        className='text-base font-normal'>{transGears}</span></p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Vendedor</h3>
                    <SellerIcon/>
                </div>
                <div className='grid grid-cols-1 gap-2 py-2'>
                    <p className='text-sm font-light'>Jordan Valdez</p>
                    {acctVerified &&
                        <p className='text-sm font-light flex'>Verificado
                            <VerifiedIcon/>
                        </p>
                    }

                </div>
            </div>
        </div>
    </article>)
}