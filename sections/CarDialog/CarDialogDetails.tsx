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


    const baseArticles = [{
        title: 'Kilometraje', value: mileage ? `${NumberFormatter(mileage)}km` : 'No especificado'
    }, {
        title: 'Calificación', value: condition ?? 'No especificado'
    }]

    const engineArticles = [{
        title: 'Tamaño', value: engineSizeCC ? `${engineSizeCC}cc` : 'No especificado'
    }, {
        title: 'Cilindros', value: engineCylinders ?? 'No especificado'
    }, {
        title: 'Fuerza', value: engineHp ? `${engineHp}HP` : 'No especificado'
    }, {
        title: 'Torque', value: engineTqNm ? `${engineTqNm}Nm` : 'No especificado'
    }, {
        title: 'Combustible', value: fuelType ?? 'No especificado'
    }, {
        title: 'Economía', value: economyL100Km ? `${economyL100Km} Km/L` : 'No especificado'
    },];

    const transmissionArticles = [{
        title: 'Transmisión', value: transType ?? 'No especificado'
    }, {
        title: 'Sistema',
        value: driveSystem || driveSystemAlt ? `${driveSystem} (${driveSystemAlt})` : 'No especificado'
    }, {
        title: 'Velocidades', value: transGears ?? 'No especificado'
    }]


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
              className='text-secondary justify-self-end px-4 py-2 rounded border-primary flex align-middle self-end w-fit ring-0 dark:focus-visible:ring-0 bg-primary focus-visible:ring-0 focus-visible:ring-offset-0'
        >
            Ver anuncio
        </Link>
        <div className='flex flex-col'>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4 md:mt-0'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Estado</h3>
                    <CarRepairIcon/>
                </div>
                <div className='grid grid-cols-2 gap-2 py-2'>
                    {baseArticles.map((article, index) => {
                        if (!article.value) return null;
                        return (<article key={index}>
                            <p className="text-xs font-light">{article.title}</p>
                            <h3 className='text-base font-normal'>{article.value}</h3>
                        </article>)
                    })}
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Motor</h3>
                    <EngineIcon/>
                </div>
                <div className='grid grid-cols-2 gap-2 py-2'>
                    {engineArticles.map((article, index) => {
                        if (!article.value) return null;
                        return (<article key={index}>
                            <p className="text-xs font-light">{article.title}</p>
                            <h3 className='text-base font-normal'>{article.value}</h3>
                        </article>)
                    })}
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Transmisión</h3>
                    <TransmissionIcon/>
                </div>
                <div className='grid grid-cols-2 gap-2 py-2'>
                    {transmissionArticles.map((article, index) => {
                        if (!article.value) return null;
                        return (<article key={index}>
                            <p className="text-xs font-light">{article.title}</p>
                            <h3 className='text-base font-normal'>{article.value}</h3>
                        </article>)
                    })}
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-base font-bold">Vendedor</h3>
                    <SellerIcon/>
                </div>
                <div className='grid grid-cols-1 gap-2 py-2'>
                    <p className='text-sm font-light'>Jordan Valdez</p>
                    {acctVerified && <p className='text-sm font-light flex'>Verificado
                        <VerifiedIcon/>
                    </p>}

                </div>
            </div>
        </div>
    </article>)
}