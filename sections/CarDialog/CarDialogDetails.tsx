import type {Car} from "@/lib/Models";
import {Carousel} from "@/components/Carousel";
import {EngineIcon} from "@/icons/EngineIcon";
import {TransmissionIcon} from "@/icons/TransmissionIcon";
import {CarRepairIcon} from "@/icons/CarRepairIcon";
import {Button} from "@/components/ui/button";
import {ArrowWarmUpIcon} from "@/icons/ArrowWarmUpIcon";
import {useCallback, useMemo} from "react";
import {USDFormatter} from "@/lib/NumberFormats";
import {VerifiedIcon} from "@/icons/VerifiedIcon";

interface CarDialogDetailsProps extends Car {

}

export const CarDialogDetails = (props: CarDialogDetailsProps) => {
    const {brand, model, thumbnail, images, year, price} = props;

    const handleViewMore = useCallback(() => {
        // TODO integrate this
        alert('View more');
    }, []);

    const isVerified = useMemo(() => {
        if (Math.random() <= 0.33) return true;
    }, []);

    return <article
        className='text-tertiary grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-start animate-fade animate-once animate-duration-[600ms] animate-delay-0 animate-ease-linear relative'>

        <h5 className='absolute top-[-10px] right-5 md:top-5 md:right-0 flex gap-2 text-verified text-sm font-bold border-verified border rounded-2xl p-2 bg-verified/[0.1] '>
            <VerifiedIcon/>
            VENDEDOR VERIFICADO
        </h5>
        <h1 className="text-lg font-medium md:col-span-2">{year}</h1>
        <div className='mb-2 flex flex-col md:flex-row justify-between items-start md:items-end md:col-span-2'>
            <h1 className="text-xl font-semibold">
                {model}
                <span className="text-sm font-medium pl-2">({brand})</span>
            </h1>
        </div>
        <div>
            <Carousel images={[thumbnail, ...images]} model={model}/>
        </div>
        <div className='flex flex-col'>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4 md:mt-0'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-sm font-medium">Estado</h3>
                    <CarRepairIcon/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <p className='text-sm font-light'>Kilometraje: <span className='text-base'>76,000 kms</span></p>
                    <p className='text-sm font-light'>Calificación: <span className='text-base'>8<span
                        className='text-xs'>/10</span></span>
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-sm font-medium">Motor</h3>
                    <EngineIcon/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <p className='text-sm font-light'>Tamaño: <span className='text-base'>2000cc</span></p>
                    <p className='text-sm font-light'>Cilindros: <span className='text-base'>4</span></p>
                    <p className='text-sm font-light'>Fuerza: <span className='text-base'>450HP</span></p>
                    <p className='text-sm font-light'>Torque: <span className='text-base'>700N</span></p>
                    <p className='text-sm font-light'>Combustible: <span className='text-base'>Eléctrico</span></p>
                    <p className='text-sm font-light'>Economía: <span className='text-base'>262 Wh/km</span></p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 divide-y mt-4'>
                <div className='flex items-center gap-2'>
                    <h3 className="text-sm font-medium">Transmisión</h3>
                    <TransmissionIcon/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2'>
                    <p className='text-sm font-light'>Tipo: <span className='text-base'>Automático</span></p>
                    <p className='text-sm font-light'>Sistema: <span className='text-base'>AWD</span></p>
                </div>
            </div>
            <h2 className="text-xl font-semibold my-2 text-primary text-center">
                {USDFormatter(price)}
            </h2>
            <Button variant="link"
                    className='dark:text-primary border-primary flex self-end w-fit ring-0 dark:focus-visible:ring-0 bg-primary/[0.2] focus-visible:ring-0 focus-visible:ring-offset-0'
                    onClick={handleViewMore}>
                Ver más
                <ArrowWarmUpIcon className='rotate-90 ml-1'/>
            </Button>
        </div>
    </article>
}