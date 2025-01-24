import type {Car} from "@/lib/definitions";
import {Activity, Calendar, MapPin, ShieldCheck} from 'lucide-react';
import {CRCFormatter} from "@/lib/NumberFormats";
import CardTrigger from "@/components/Card/CardTrigger";

export default function Card(props: Car) {
    const {
        id,
        model,
        thumbnail,
        make,
        year,
        priceDollars,
        mileage,
        acctVerified,
        location,
    } = props;

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
             id={`car-${id}`}>
            <div className="relative aspect-[16/9]">
                <img
                    src={thumbnail}
                    alt={`${make} ${model}`}
                    className="w-full h-full object-cover rounded-t-lg"
                />
            </div>

            <div className="p-4">
                <div className="flex justify-between gap-2">
                    <h3 className="text-lg font-semibold text-tertiary">{`${make} ${model}`}</h3>
                    {
                        acctVerified &&
                        <div
                            className="bg-verified text-white px-2 py-1 rounded-lg text-sm flex items-center">
                            <ShieldCheck className="h-4 w-4"/>
                        </div>
                    }
                </div>
                <p className="text-lg font-bold text-primary mt-2">
                {CRCFormatter(priceDollars)}
                </p>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-tertiary">
                        <Calendar className="h-4 w-4 mr-2"/>
                        {year}
                    </div>
                    <div className="flex items-center text-sm text-tertiary">
                        <Activity className="h-4 w-4 mr-2"/>
                        {mileage}
                    </div>
                    <div className="flex items-center text-sm text-tertiary">
                        <MapPin className="h-4 w-4 mr-2"/>
                        {`${location?.city}, ${location?.state}`}
                    </div>
                </div>
            </div>
            <CardTrigger id={+id}/>
        </div>
        // <article
        //     className="animate-fade animate-once animate-duration-700 animate-delay-0 cursor-pointer relative"
        //     id={`car-${id}`}
        // >
        //     <Carousel images={[thumbnail, ...images]} model={model} id={+id} showIcon={true}/>
        //     <div className="mt-2 grid grid-cols-2 text-tertiary relative">
        //         <p className="text-sm opacity-95 flex col-span-full">{make} {model} <strong
        //             className='ml-1'>{year}</strong> {acctVerified &&
        //             <VerifiedIcon/>}</p>
        //         {trim &&
        //             <h1 className="text-sm font-medium opacity-95 text-balance col-span-full">{trim}</h1>}
        //         {transType && <p className="text-sm opacity-95 col-span-full">{transType}</p>}
        //         {mileage > 0 && <p className="text-sm opacity-95">{NumberFormatter(mileage)}km</p>}
        //         {priceDollars && <h1 className="text-base font-semibold text-right">{CRCFormatter(priceDollars)}</h1>}
        //         <CardTrigger id={+id}/>
        //     </div>
        // </article>
    );
};
