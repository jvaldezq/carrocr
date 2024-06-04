import type {Car} from "@/lib/definitions";
import {Carousel} from "@/components/Carousel";
import {VerifiedIcon} from "@/icons/VerifiedIcon";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import CardTrigger from "@/components/Card/CardTrigger";
import CarPlaceholderImage from '@/assets/car-placeholder.webp';

export default function Card(props: Car) {
    const {
        id,
        model,
        trim,
        images = [],
        thumbnail = CarPlaceholderImage.src,
        make,
        year,
        priceDollars,
        mileage,
        transType,
        acctVerified,
    } = props;

    return (
        <article
            className="animate-fade animate-once animate-duration-700 animate-delay-0 cursor-pointer"
        >
            <Carousel images={[thumbnail, ...images]} model={model}/>
            {acctVerified && <VerifiedIcon className="absolute top-1 left-1"/>}
            <div className="mt-2 grid grid-cols-2 text-tertiary relative">
                <h1 className="text-base font-semibold col-span-2 opacity-95 text-balance">
                    {`${trim} ${model}`}
                </h1>
                <p className="text-sm opacity-95">{make}</p>
                <p className="text-sm text-right opacity-95">{year}</p>
                <p className="text-sm opacity-95">{transType}</p>
                <p className="text-sm text-right opacity-95">{NumberFormatter(mileage)}km</p>
                <h1 className="text-sm font-semibold pt-1.5 text-end col-span-2">{USDFormatter(priceDollars)}</h1>
                <CardTrigger id={+id}/>
            </div>
        </article>
    );
};
